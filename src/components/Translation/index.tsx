import { ConnectState } from "@/models/connect";
import { storeContainer } from "@/pages/DashboardCommon/RobotStruct/store";
import { useSelector } from "umi";
import styles from "./index.less";
import { Button, Spin } from "antd";
import { useState } from "react";
import Loading from "../Loading";

export default function Translation() {
  const [hasContent, setHasContent] = useState(false);
  const [translations, setTranslations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { resultJson } = storeContainer.useContainer();
  let original: any[] = [];
  console.log(resultJson);
  if (resultJson) {
    !hasContent && setHasContent(true);
    const pages = resultJson.pages;
    original = pages.map((page) => {
      const content = page.content;
      return content.map((item) => item.text || "").join("");
    });
    console.log("pages:", pages);
  }

  const handleTranslate = () => {
    setLoading(true);
    setTranslations([]);
    setTimeout(() => {
      setTranslations(original);
      setLoading(false);
    }, 1000);
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
