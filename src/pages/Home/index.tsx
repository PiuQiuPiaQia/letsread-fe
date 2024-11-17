import { removeToken } from "@/utils/storage";
import { Button } from "antd";
import { history } from "umi";

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
      <Button onClick={exitLogin}>退出</Button>
    </div>
  );
}


