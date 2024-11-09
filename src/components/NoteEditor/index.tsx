import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import style from "./index.less";
import { notification } from "antd";

export default function NoteEditor(props) {
  const editorRef = useRef(null);
  const { height, pos, contentId } = props;
  const [btnText, setBtnText] = React.useState("全文");

  console.log(contentId, "contentId");

  const info = () => {
    notification.info({
      message: "笔记锚点需要先选中原文1111",
    });
  };

  const handleEditorChange = (content) => {
    props.onChange(content);
  };

  const noteBelongHandler = (api) => {
    // 按钮点击时执行的动作
    if (contentId) {
      api.setActive(true);
      props.onNoteBelong(contentId);
    } else {
      info();
    }
  };

  return (
    <div className={`${style["mce-container"]}`}>
      <Editor
        onInit={(evt, editor) => {
          editorRef.current = editor;
          editor.on("focusout", () => {
            handleEditorChange(editor.getContent());
          });
        }}
        initialValue=""
        init={{
          height: height || 150,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "wordcount",
          ],
          toolbar:
            "noteBelong | blocks | bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat",
          skin: "small",
          icons: "small",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          setup: (editor) => {
            editor.ui.registry.addToggleButton("noteBelong", {
              text: "笔记锚点", // 按钮文本
              onAction: (api) => {
                noteBelongHandler(api);
              },
              onSetup: function (api) {
                // 设置按钮的初始状态
                var initialActiveState = false; // 假设我们想要按钮初始为高亮状态
                api.setActive(initialActiveState);
              },
            });
          },
        }}
      />
    </div>
  );
}
