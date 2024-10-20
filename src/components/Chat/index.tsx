import { ConnectState } from "@/models/connect";
import { connect } from "umi";

function Chat() {
    return <div>Chat</div>;
}


export default connect((state: ConnectState) => state)(Chat);