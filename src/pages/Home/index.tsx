import Setting from "@/components/Setting";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("阅读", "read", <PieChartOutlined />),
  getItem("设置", "setting", <DesktopOutlined />),
];

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectKey, setSelectKey] = useState<React.Key>("read");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onSelect: MenuProps["onSelect"] = ({ key }) => {
    console.log("selected", key);
    setSelectKey(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onSelect={onSelect}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            height: "48px",
            padding: 0,
            marginBottom: "20px",
            background: colorBgContainer,
          }}
        />
        <Content style={{ margin: "0 16px" }}>
          {selectKey === "read" ? (
            <h1>Bill is a cat.</h1>
          ) : selectKey === "setting" ? (
            <Setting />
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
