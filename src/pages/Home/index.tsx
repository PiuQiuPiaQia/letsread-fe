import { login } from "@/services/user";

export default function Home() {
  // todo test
  login({
    username: "ryan",
    password: "123456",
  });
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
