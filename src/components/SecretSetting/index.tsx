import { getKeyByName, storeKeyByName } from "@/services/secret";
import { useMount } from "ahooks";
import {
  Alert,
  Button,
  Card,
  Form,
  FormProps,
  Input,
  Layout,
  message,
  Typography,
} from "antd";

import React, { useState } from "react";

const { Content } = Layout;
const { Text } = Typography;

const SecretSetting: React.FC = () => {
  const [loading, setLoading] = useState(true);
  let [moonshotApiKey, setMoonshotApiKey] = useState("未设置");
  let [translateAppId, setTranslateAppId] = useState("未设置");
  let [translateSecretKey, setTranslateSecretKey] = useState("未设置");

  useMount(() => {
    getKey();
  });

  const getKey = async () => {
    setLoading(true);
    getKeyByName({ name: "moonshot_api_key" }).then((res) => {
      console.log(res);
      setMoonshotApiKey(res.value);
    });
    getKeyByName({ name: "appid" }).then((res) => {
      console.log(res);
      setTranslateAppId(res.value);
    });
    getKeyByName({ name: "secret_key" }).then((res) => {
      console.log(res);
      setTranslateSecretKey(res.value);
    });
    setLoading(false);
  };

  const onFinishMoonshot: FormProps["onFinish"] = (values) => {
    console.log("Success:", values);
    storeKeyByName({
      name: "moonshot_api_key",
      value: values.moonshot_api_key,
    }).then((res) => {
      console.log(res);
      message.success("保存成功");
    });
  };
  const onFinishTranslate: FormProps["onFinish"] = async (values) => {
    console.log("Success:", values);
    await storeKeyByName({ name: "appid", value: values.appid });
    await storeKeyByName({ name: "secret_key", value: values.secret_key });
    message.success("保存成功");
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Layout>
        <Content>
          <Alert
            message="为保证个人密钥的安全性，不能查看已设置的密钥，只能更新密钥。"
            type="warning"
            style={{ marginBottom: "30px" }}
          />

          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinishMoonshot}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Card
              size="small"
              title="Moonshot"
              bordered={false}
              style={{ width: "100%", marginBottom: "30px" }}
            >
              <Form.Item label="API Key">
                <Text>{moonshotApiKey}</Text>
              </Form.Item>

              <Form.Item
                label="API Key"
                name="moonshot_api_key"
                rules={[
                  {
                    required: true,
                    message: "Please input your moonshot api key!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Card>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                更新Moonshot
              </Button>
            </Form.Item>
          </Form>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinishTranslate}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Card
              size="small"
              title="百度翻译"
              bordered={false}
              style={{ width: "100%", marginBottom: "30px" }}
            >
              <Form.Item label="APP ID">
                <Text>{translateAppId}</Text>
              </Form.Item>
              <Form.Item
                label="APP ID"
                name="appid"
                rules={[
                  { required: true, message: "Please input your APP ID!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="密钥">
                <Text>{translateSecretKey}</Text>
              </Form.Item>
              <Form.Item
                label="密钥"
                name="secret_key"
                rules={[
                  {
                    required: true,
                    message: "Please input your secret key!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Card>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                更新百度翻译
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </>
  );
};

export default SecretSetting;
