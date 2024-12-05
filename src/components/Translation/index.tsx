import { storeContainer } from "@/pages/DashboardCommon/RobotStruct/store";
import { translateText } from "@/services/util";
import { useMount } from "ahooks";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import styles from "./index.less";

export default function Translation(props: any) {
  const [hasTranslation, setHasTranslation] = useState(false);
  const [translations, setTranslations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { resultJson } = storeContainer.useContainer();
  let [original, setOriginal] = useState<string[]>([]);
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
    Promise.all(original.map((text) => translateText({ data: text })))
      .then((res) => {
        console.log("res:", res);
        const translations = res.map((item, index) => {
          const { code } = item;
          return code === 200 ? item.trans_result : original[index];
        });
        setTranslations(translations);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.translation}>
      {loading && <Loading type="loading" text="翻译中。。。" />}
      {/* {hasContent ? <Button onClick={handleTranslate}>开始翻译</Button> : null} */}
      {translations.map((item, index) => (
        <div className={styles.translation__item} key={index}>
          {item}
        </div>
      ))}
    </div>
  );
}
