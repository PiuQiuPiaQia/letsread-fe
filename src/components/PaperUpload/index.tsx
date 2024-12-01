import { uploadPaper } from "@/services/paper";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Spin, Upload, UploadProps } from "antd";
import { useState } from "react";
import style from "./index.less";

export default function PaperUpload(props: { onUploadDone: () => void }) {
  const [loading, setLoading] = useState(false);

  const uploadProps: UploadProps = {
    accept: ".pdf",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest: async (options) => {
      setLoading(true);
      message.info("上传中...");
      const formData = new FormData();
      formData.append("file", options.file);
      // @ts-ignore
      formData.append("title", options.file.name);
      uploadPaper(formData).then((res) => {
        console.log(res);
        props.onUploadDone?.();
        setLoading(false);
        message.success("上传成功");
      });
    },
    showUploadList: false,
    disabled: loading,
  };
  return (
    <div className={`${style["paper-upload"]}`}>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>上传PDF</Button>
      </Upload>
      {loading ? <Spin></Spin> : null}
    </div>
  );
}
