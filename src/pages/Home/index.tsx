import {Button} from 'antd'
import { useHistory } from 'react-router-dom';
import { removeToken } from '@/utils/storage';
export default function Home() {
  const history = useHistory();
  //退出登录
  const exitLogin = () => {
    console.log("退出")
    history.push('/login')
    removeToken()
  }
  return (
    <div>
      <h1>Home</h1>
      <Button onClick={exitLogin}>退出</Button>
    </div>
  );
}

