import PaperList from "@/components/PaperList";
import Setting from "@/components/Setting";
import { uploadPaper } from "@/services/paper";
import {
  DesktopOutlined,
  PieChartOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { MenuProps, UploadProps } from "antd";
import { Button, Layout, Menu, message, theme, Upload } from "antd";
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

  const uploadProps: UploadProps = {
    name: "file",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest: async (options) => {
      const formData = new FormData();
      formData.append("file", options.file);
      formData.append("title", options.filename!);
      uploadPaper(formData).then((res) => {
        console.log(res);
      });
    },
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
            <>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              <PaperList></PaperList>
            </>
          ) : selectKey === "setting" ? (
            <Setting />
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
