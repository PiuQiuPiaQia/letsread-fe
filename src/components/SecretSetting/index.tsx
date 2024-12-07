import { Button, Card, Form, FormProps, Input, Layout, message } from "antd";
import { useMount } from "ahooks";
import React, { useEffect, useState } from "react";
import { getKeyByName, storeKeyByName } from "@/services/secret";


const { Content } = Layout;

const SecretSetting : React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  
  useMount(() => {
    getKey()
  });

  const getKey = async () => {
    setLoading(true);
    getKeyByName({name:"moonshot_api_key"}).then((res) => {
      console.log(res);
      form.setFieldsValue({
        moonshot_api_key: res.value,  
      })
    });
    getKeyByName({name:"appid"}).then((res) => {
      console.log(res);
      form.setFieldsValue({
        appid: res.value,  
      })
    });
    getKeyByName({name:"secret_key"}).then((res) => {
      console.log(res);
      form.setFieldsValue({
        secret_key: res.value,  
      })
    });
    setLoading(false);
  };

  // useEffect(() => {
  //   if (Object.keys(data).length > 0) {
  //     form.resetFields(); // 使用接口返回的数据回填表单
  //   }
  // }, [data, form]);

  const storeKey = async (values:any) => {
    storeKeyByName({name:"moonshot_api_key",value:values.moonshot_api_key}).then((res) => {
      console.log(res);
    });
    storeKeyByName({name:"appid",value:values.appid}).then((res) => {
      console.log(res);
    });
    storeKeyByName({name:"secret_key",value:values.secret_key}).then((res) => {
      console.log(res);
    });
    message.success("保存成功");
  };


  const onFinish: FormProps["onFinish"] = (values) => {
    console.log("Success:", values);
    storeKey(values);
  };


  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Layout>
        <Content>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Card
              size="small"
              title="Moonshot"
              bordered={false}
              style={{ width: "100%", marginBottom: "30px" }}
            >
              {/* <Form.Item
                label="密钥"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item> */}

              <Form.Item
                label="API Key"
                name="moonshot_api_key"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password/>
              </Form.Item>
            </Card>

            <Card
              size="small"
              title="百度翻译"
              bordered={false}
              style={{ width: "100%", marginBottom: "30px" }}
            >
              <Form.Item
                label="APP ID"
                name="appid"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="密钥"
                name="secret_key"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Card>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </>
  );
};

export default SecretSetting;
