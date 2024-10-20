import { ConnectState } from "@/models/connect";
import { connect } from "umi";

function Note() {
    return <div>Note</div>;
}


export default connect((state: ConnectState) => state)(Note);