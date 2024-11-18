import { getPapers } from "@/services/paper";
import { useMount } from "ahooks";
import { Col, Row, Spin } from "antd";
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
      setLoading(false);
    });
  });

  return (
    <>
      <Spin spinning={loading} size="large" />
      <div className={`${style["paper-list"]}`}>
        <Row gutter={[16, 24]}>
          {paperList.map((item) => {
            return (
              <Col className="gutter-row" span={12}>
                <PaperCard key={item.paper_id} {...item}></PaperCard>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
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
      <div className={`${style["paper-card__bottom"]}`}>
        <div className={`${style["paper-card__bottom__author"]}`}>
          {paper.authors}
        </div>
        <div className={`${style["paper-card__bottom__create"]}`}>
          {paper.created_at}
        </div>
      </div>
    </div>
  );
};

export default PaperList;
