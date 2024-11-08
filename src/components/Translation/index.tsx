import { ConnectState } from "@/models/connect";
import { storeContainer } from "@/pages/DashboardCommon/RobotStruct/store";
import { useSelector } from "umi";
import styles from "./index.less";
import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { translateText } from "@/services/util";

export default function Translation() {
  const [hasContent, setHasContent] = useState(false);
  const [translations, setTranslations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { resultJson } = storeContainer.useContainer();
  let [original, setOriginal] = useState<string[]>([]);
  console.log("resultJson:", resultJson);
  useEffect(() => {
    !hasContent && setHasContent(true);
    const pages = resultJson?.pages || [];
    setOriginal(
      pages.map((page) => {
        const content = page.content;
        return content
          .map((item) => {
            
            return item.text || "";
          })
          .join("");
      })
    );

    console.log("pages:", pages);
  }, [resultJson]);

  useEffect(() => {
    console.log("original:", original);
  }, [original]);

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
      {hasContent ? <Button onClick={handleTranslate}>开始翻译</Button> : null}
      {translations.map((item, index) => (
        <div className={styles.translation__item} key={index}>
          {item}
        </div>
      ))}
    </div>
  );
}
