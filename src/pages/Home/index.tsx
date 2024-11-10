import { removeToken } from "@/utils/storage";
import { Button } from "antd";
import { history } from "umi";

import { ProChat } from "@ant-design/pro-chat";
import { useTheme } from "antd-style";

export default function Home() {
  //退出登录
  const exitLogin = () => {
    console.log("退出");
    history.push("/login");
    removeToken();
  };
  return (
    <div>
      <h1>Home</h1>
      <Chat></Chat>
      <Button onClick={exitLogin}>退出</Button>
    </div>
  );
}

const Chat = () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        helloMessage={
          "欢迎使用 ProChat ，我是你的专属机器人，这是我们的 Github：[ProChat](https://github.com/ant-design/pro-chat)"
        }
        request={async (messages) => {
          const mockedData: string = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
          return new Response(mockedData);
        }}
      />
    </div>
  );
};
