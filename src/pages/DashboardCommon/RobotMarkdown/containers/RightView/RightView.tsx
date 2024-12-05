import markdownSwitchIcon from "@/assets/images/markdown_switch.png";
import Chat from "@/components/Chat";
import Loading, { DotsLoading } from "@/components/Loading";
import Note from "@/components/Note";
import Translation from "@/components/Translation";
import type { ConnectState } from "@/models/connect";
import { Radio, Switch, Tooltip } from "antd";
import classNames from "classnames";
import lodash from "lodash";
import type { FC, ReactNode } from "react";
import { useMemo, useState } from "react";
import ReactJson from "react-json-view";
import { connect } from "umi";
import { storeContainer } from "../../../RobotStruct/store";
import styles from "./index.less";

enum ResultType {
  json = "json",
  md = "md",
  table = "table",
  image = "image",
  formula = "formula",
  handwriting = "handwriting",
}

enum TabType {
  // 对话
  chat = "chat",
  // 笔记
  note = "note",
  // 翻译
  Translation = "Translation",
}

export { ResultType, TabType };

interface IProps {
  renderFooter: (curType: ResultType) => ReactNode;
  onTabChange?: (curType: ResultType) => void;
  resultTabName?: string;
  wrapperClassName?: string;
  result: any;
  Common: ConnectState["Common"];
  Robot: ConnectState["Robot"];
  children?: any;
}
const tabMap = {
  [ResultType.md]: "原文",
  [ResultType.table]: "表格",
  [ResultType.image]: "图片",
  [ResultType.formula]: "公式",
  [ResultType.json]: "原始JSON",
  [ResultType.handwriting]: "手写",
  [TabType.chat]: "对话",
  [TabType.Translation]: "翻译",
  [TabType.note]: "笔记",
};
const RightContainer: FC<IProps> = ({
  renderFooter,
  onTabChange,
  children,
  wrapperClassName,
  result,
  Common,
  Robot,
}) => {
  const [resultType, setResultType] = useState<ResultType | TabType>(
    ResultType.md
  );
  const [firstLoadedList, setFirstLoadedList] = useState<string[]>([]);
  const { resultLoading } = Common;

  const {
    showModifiedMarkdown,
    setShowModifiedMarkdown,
    markdownMode,
    showAutoSave,
    autoSaveMarkdown,
    setAutoSaveMarkdown,
    resultJsonSaveLoading,
  } = storeContainer.useContainer();

  const showAutoSaveSwitch = resultType === ResultType.md && showAutoSave;

  const options = useMemo(() => {
    return [ResultType.md, TabType.Translation, TabType.chat, TabType.note].map(
      (item) => ({
        label: tabMap[item],
        value: item,
      })
    );
  }, []);

  const showJSON = useMemo(() => {
    if (!result) return {};
    return lodash.omit(result, [
      "dpi",
      "catalog",
      "detail_new",
      "markdown_new",
    ]);
  }, [result]);

  const showMarkdownSwitcher = useMemo(() => {
    return (
      resultType === ResultType.md &&
      result?.detail_new &&
      markdownMode === "view"
    );
  }, [result, resultType, markdownMode]);

  const handleChangeTab = (e: any) => {
    const type = e.target.value;
    setResultType(type);
    setFirstLoadedList((prev) => [...prev, type]);
    if (onTabChange) {
      onTabChange(type);
    }
  };

  const renderContent = () => {
    if (resultLoading) {
      return <Loading type="normal" />;
    }
    const contentList: JSX.Element[] = [];

    // 暂时不用
    const jsonXml = (
      <div
        className={classNames(styles.contentWrapper, styles.jsonViewWrapper)}
        style={showContentStyle(ResultType.md)}
      >
        <ReactJson
          src={showJSON}
          enableClipboard={false}
          onEdit={false}
          name={null}
          collapsed={3}
          onAdd={false}
          style={{
            fontFamily: "Monaco, Menlo, Consolas, monospace",
            color: "#9b0c79",
          }}
          displayDataTypes={false}
          displayObjectSize={false}
          collapseStringsAfterLength={1000}
        />
      </div>
    );
    const mdXml = <div style={showContentStyle(ResultType.md)}>{children}</div>;
    const translationXml = (
      <div style={showContentStyle(TabType.Translation)}>
        <Translation
          firstLoad={firstLoadedList.includes(TabType.Translation)}
        ></Translation>
      </div>
    );
    const chatXml = (
      <div style={showContentStyle(TabType.chat)}>
        <Chat></Chat>
      </div>
    );
    const noteXml = (
      <div style={showContentStyle(TabType.note)}>
        <Note></Note>
      </div>
    );
    contentList.push(mdXml, translationXml, chatXml, noteXml);

    return (
      <div className={classNames(styles.contentWrapper, "result-content-body")}>
        {contentList}
      </div>
    );
  };

  function showContentStyle(type: ResultType | TabType) {
    console.log(resultType, type);

    return {
      height: "100%",
      display: resultType === type ? "block" : "none",
    };
  }

  return (
    <>
      <div
        className={classNames(
          "robotResultTabContainer",
          "tour_step_2",
          wrapperClassName,
          styles.rightContainer
        )}
      >
        <div className={styles.header}>
          <Radio.Group
            className={styles.radioBtnGroup}
            value={resultType}
            optionType="button"
            buttonStyle="solid"
            onChange={handleChangeTab}
            options={options}
          />
          {showMarkdownSwitcher && (
            <Tooltip
              title={
                showModifiedMarkdown ? "展示原始识别结果" : "展示最新修改结果"
              }
              placement="topRight"
            >
              <img
                className={styles.markdownSwitch}
                src={markdownSwitchIcon}
                onClick={() => {
                  setShowModifiedMarkdown(!showModifiedMarkdown);
                }}
              />
            </Tooltip>
          )}
          {showAutoSaveSwitch && (
            <div className={styles.autoSave}>
              <div>
                {resultJsonSaveLoading ? (
                  <span>
                    保存中
                    <DotsLoading />
                  </span>
                ) : (
                  "自动保存"
                )}
              </div>
              <div style={{ width: 8 }} />
              <Switch
                checked={autoSaveMarkdown}
                onChange={(value) => setAutoSaveMarkdown(value)}
              />
            </div>
          )}
        </div>
        {renderContent()}
      </div>

      {/* {renderFooter(resultType)} */}
    </>
  );
};

export default connect((state: ConnectState) => state)(RightContainer);
