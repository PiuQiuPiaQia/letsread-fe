import { useState,useEffect } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from "@/services/user";
import { setToken} from '@/utils/storage';

import { useHistory } from 'react-router-dom';
const { Title } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const Login=() => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

   
  // 从localStorage中读取用户名
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const storedRemember = localStorage.getItem('remember') === 'true';
    if (storedUsername) {
      form.setFieldsValue({ username: storedUsername,password:storedPassword, remember:storedRemember});
    }
  }, [form]); // 依赖项为form，确保form创建后执行

  const onFinish = async(values: LoginFormValues) => {
    if (values.remember) {
      localStorage.setItem('username', values.username);
      localStorage.setItem('password', values.password);
      localStorage.setItem('remember', 'true'); 
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.setItem('remember', 'false'); // 存储记住密码的状态
    }
    setLoading(true)

    try{
        const res = await login({
            username:values.username,
            password:values.password,
        });
        console.log("res:" + JSON.stringify(res))
        if(res && res.code === 200){
          const token = res.data.token
          setToken(token)
          history.push('/home');//跳转到首页
        }else{
            setLoading(false)
        }
    }catch(e){
        setLoading(false)
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card style={{ width: 400 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Title level={2}>登录</Title>
        </div>
        <Form
          form={form}
          name="login"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '用户名不能为空！' }]}
          >
            <Input
              prefix={<UserOutlined/>}
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '密码不能为空！' }]}
          >
            <Input
              prefix={<LockOutlined  />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset:5,span: 19 }}>
            <Form.Item name="remember" valuePropName="checked" noStyle >
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }} >
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;