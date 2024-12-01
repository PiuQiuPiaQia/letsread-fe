import { deletePaper, getPapers } from "@/services/paper";
import { DeleteOutlined } from "@ant-design/icons";
import { useMount } from "ahooks";
import { Col, message, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { history } from "umi";
import style from "./index.less";

const PaperList: React.FC<{
  refreshKey: number;
}> = (props: any) => {
  const [paperList, setPaperList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useMount(() => {
    getPaperList();
  });

  const getPaperList = async () => {
    setLoading(true);
    getPapers().then((res) => {
      // console.log(res);
      setPaperList(res.papers);
      setLoading(false);
    });
  };

  useEffect(() => {
    getPaperList();
  }, [props.refreshKey]);

  return (
    <>
      <Spin spinning={loading} size="large" />
      <div className={`${style["paper-list"]}`}>
        <Row gutter={[16, 24]}>
          {paperList.map((item) => {
            return (
              <Col className="gutter-row" span={12} key={item.paper_id}>
                <PaperCard
                  {...item}
                  onDelete={() => {
                    message.info("删除成功");
                    getPaperList();
                  }}
                ></PaperCard>
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

  const actions = [
    {
      label: "D",
      icon: <DeleteOutlined />,
      onClick: (e) => {
        e.stopPropagation();
        console.log("delete");
        deletePaper({
          paper_id: paper.paper_id,
        }).then((res) => {
          const { code } = res;
          if (code === 200) {
            paper?.onDelete();
          }
        });
      },
    },
  ];
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
      <div className={`${style["paper-card__actions"]}`}>
        {actions.map((action, index) => {
          return (
            <div
              key={index}
              onClick={action.onClick}
              className={`${style["paper-card__actions__item"]}`}
            >
              {action.icon}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaperList;
