import { ConnectState } from "@/models/connect";
import { storeContainer } from "@/pages/DashboardCommon/RobotStruct/store";
import { useSelector } from "umi";
import styles from "./index.less";

export default function Translation() {
  const { resultJson } = storeContainer.useContainer();
  let translations: any[] = [];
  console.log(resultJson);
  if (resultJson) {
    const pages = resultJson.pages;
    translations = pages.map((page) => {
      const content = page.content;
      return content.map((item) => item.text || "").join("");
    });
    console.log("pages:", pages);
  }

  return (
    <div className={styles.translation}>
      {translations.map((item, index) => (
        <div className={styles.translation__item} key={index}>
          {item}
        </div>
      ))}
    </div>
  );
}
