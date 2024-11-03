import React, { useState } from 'react';
import { Card, Button, Checkbox, Form, Input } from 'antd'
import styles from './index.module.less' //css modules相关知识点/因为在jsconfig.json里已经配置过绝对引入了，所以这里可以写绝对路径，详见2-1-19以及https://create-react-app.dev/docs/importing-a-component
import { login } from "@/services/user";
import { setToken,setLocalUsername,setLocalPassword,setLocalRememberMe,getLocalPassword,getLocalUsername,getLocalRememberMe,removeLocalPassword,removeLocalusername } from '@/utils/storage';
import { useHistory } from 'react-router-dom';

export default function Login(){
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  //加载上次保存的信息
  const loadSavedPassword = () => {
    const savedUsername = getLocalUsername()
    const savedPassword = getLocalPassword()
    console.log("rememberMe:" + getLocalRememberMe())
    setRememberMe(getLocalRememberMe());
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
    }
  };
  // 在组件挂载时加载保存的登录信息
  React.useEffect(() => {
    loadSavedPassword();
  }, []);
  
  //切换记住密码按钮
  const changeRemberMe =  (e) => {
    setRememberMe(e.target.checked)
    setLocalRememberMe(e.target.checked);
  }
  //表单校验
  const onFinish = async ({ username, password, rememberMe }) => {
    setLocalRememberMe(rememberMe);
    if (rememberMe) {
      setLocalUsername(username);
      setLocalPassword(password);
    } else {
      removeLocalusername();
      removeLocalPassword();
    }
    try {
        setLoading(true)
        const res = await login({
          username,
          password,
        });
        console.log("res:" + JSON.stringify(res))
        if(res && res.code === 200){
          const token = res.data.token
          setToken(token)
          history.push('/home');//跳转到首页
        }
       } catch (error) {
        setLoading(false)
       }
  };
  return (
    <div className={styles.login}>
      <Card className="login-container">
          <div className="login-title">登录</div>
        <Form
          size="large"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          validateTrigger={['onChange', 'onBlur']}
          onFinish={onFinish}
          initialValues={{
            username: 'ryan',
            password: '123456',
            rememberMe: true,
          }}
        >
          <Form.Item
            label="用户名"
            name="username" //必须加name属性，否则rules校验规则无法生效
            rules={[
              {
                required: true,
                message: '用户名不能为空',
              },
            ]}
          >
            <Input placeholder="请输入你的用户名" autoComplete='off' value={username} onChange={(e) => setUsername(e.target.value)}/>
          </Form.Item>

          <Form.Item label="密码" name="password" rules={[
            {
              required: true,
              message: '密码不能为空'
            },
          ]}>
            <Input.Password placeholder="请输入密码" autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)}></Input.Password>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset:4,span: 20 }}
            valuePropName='checked'
            name="rememberMe"
          >
            <Checkbox checked={rememberMe} onChange={changeRemberMe}>记住密码</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );

};