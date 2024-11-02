import { login } from "@/services/user";

export default function Home() {
    // todo test
    login()
    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}