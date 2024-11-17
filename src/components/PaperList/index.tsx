import { getPapers } from "@/services/paper";
import { useMount } from "ahooks";
import { Spin } from "antd";
import React, { useState } from "react";
import { history } from "umi";
import style from "./index.less";

const PaperList: React.FC = () => {
  const [paperList, setPaperList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useMount(() => {
    getPapers().then((res) => {
      // console.log(res);
      setPaperList(res.papers);
      setLoading(false)
    });
  });

  return (
    <div className={`${style["paper-list"]}`}>
      <Spin spinning={loading} size="large" />
      {paperList.map((item) => {
        return <PaperCard key={item.paper_id} {...item}></PaperCard>;
      })}
    </div>
  );
};

const PaperCard = (paper) => {
  const openPaper = () => {
    const path = history.createHref({
      pathname: "/robot_markdown",
      search: new URLSearchParams({
        paper_id: paper.paper_id,
      }).toString(),
    });
    window.open(path, "_blank");
  };
  return (
    <div onClick={openPaper} className={`${style["paper-card"]}`}>
      <div className={`${style["paper-card__title"]}`}>{paper.title}</div>
      <div className={`${style["paper-card__author"]}`}>{paper.authors}</div>
    </div>
  );
};

export default PaperList;
