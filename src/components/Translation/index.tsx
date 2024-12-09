import { storeContainer } from "@/pages/DashboardCommon/RobotStruct/store";
import { translateText } from "@/services/util";
import { useMount } from "ahooks";
import { Progress } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.less";

export default function Translation(props: any) {
  const [hasTranslation, setHasTranslation] = useState(false);
  const [translations, setTranslations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { resultJson } = storeContainer.useContainer();
  let [original, setOriginal] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  console.log("resultJson:", resultJson);
  useMount(() => {
    console.log("useMount Translation");
    setTimeout(() => {}, 1000);
  });
  useEffect(() => {
    const pages = resultJson?.detail || [];
    setOriginal(
      pages.map((page) => {
        return page.text || "";
      })
    );
    console.log("pages:", pages);
  }, [resultJson]);

  useEffect(() => {
    console.log("original:", original);
  }, [original]);

  useEffect(() => {
    if (props.firstLoad) {
      if (!hasTranslation && original.length) {
        // 自动翻译
        handleTranslate();
        setHasTranslation(true);
      }
    }
  }, [props.firstLoad]);

  const handleTranslate = () => {
    setLoading(true);
    setTranslations([]);
    const total = original.length; // 总任务数
    let completed = 0; // 已完成的任务数
    setProgress(0);

    const promises = original.map((text) => {
      return new Promise((resolve) => {
        translateText({ data: text }).then((res) => {
          completed++;
          console.log(
            completed,
            total,
            Math.floor((completed / total) * 100),
            progress
          );

          setProgress(Math.floor((completed / total) * 100));
          const { code } = res;
          resolve(code === 200 ? res.trans_result : original[completed - 1]);
        });
      });
    });

    Promise.all(promises)
      .then((translations) => {
        console.log("res:", translations);
        setTranslations(translations);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.translation}>
      {/* {loading && <Loading type={loading ? "loading" : "success"} />} */}
      {loading && (
        <Progress
          format={(percent) => `翻译中 ${percent}%`}
          percent={progress}
          status="active"
        />
      )}
      {/* {hasContent ? <Button onClick={handleTranslate}>开始翻译</Button> : null} */}
      {translations.map((item, index) => (
        <div className={styles.translation__item} key={index}>
          {item}
        </div>
      ))}
    </div>
  );
}
