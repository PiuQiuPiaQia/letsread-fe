import { Tabs } from "antd";
import React from "react";
import SecretSetting from "../SecretSetting";

const Setting: React.FC = () => {
  const tabList = [
    {
      key: "secret",
      label: "密钥管理",
      children: <SecretSetting />,
    },
  ];

  return (
    <>
      <Tabs tabPosition={"left"} items={tabList} />
    </>
  );
};

export default Setting;
