import { storeContainer } from "@/pages/DashboardCommon/RobotStruct/store";
import { getNotes, saveNotes } from "@/services/note";
import { useMount } from "ahooks";
import { Button, List, message } from "antd";
import { useEffect, useMemo, useState } from "react";
import NoteEditor from "../NoteEditor";
import style from "./index.less";

interface NoteItem {
  notesId: number;
  content: string;
  isNew: boolean;
  contentId: number;
}

const defaultNode: NoteItem = {
  notesId: -1,
  content: "",
  isNew: false,
  contentId: -1,
};

export default function Note() {
  // 初始化笔记列表状态，每个笔记都有一个唯一的id和内容
  const [notes, setNotes] = useState<NoteItem[]>([]);
  // 当前编辑的笔记
  const [currentNoteId, setCurrentNoteId] = useState<number>(-1);
  // 初始化下一个笔记的id
  const [nextNoteId, setNextNoteId] = useState(1);
  const { currentFile, rectList, curUid, currentPaperId, ...args } =
    storeContainer.useContainer();
  // console.log(2222, args);
  console.log(currentFile, rectList);
  useEffect(() => {
    console.log("curUid", curUid);
  }, [curUid]);

  useMemo(() => {
    getNotes({ paper_id: currentPaperId }).then((res) => {
      // console.log("getNotes", res);
      const notes = res.notes.length ? res.notes : [{ ...defaultNode }];
      setNotes(
        notes.map((item) => {
          return {
            contentId: item.content_id,
            notesId: item.note_id,
            content: item.note,
          };
        })
      );
    });
  }, [currentFile]);

  // 处理新增笔记的操作
  const handleAddNote = () => {
    const newNote: NoteItem = {
      notesId: nextNoteId,
      content: "",
      isNew: true,
      contentId: -1,
    };
    setNotes([...notes, newNote]); // 将新笔记添加到列表中
    setNextNoteId(nextNoteId + 1); // 更新下一个笔记的id
  };

  useMount(() => {
    // 默认添加一个笔记
    // todo: 目前只支持一个笔记
    handleAddNote();
  });

  // 处理保存笔记的操作
  const handleSaveNote = () => {
    console.log("保存笔记");
    setTimeout(() => {
      const note = notes[0];
      saveNotes({
        paper_id: currentPaperId,
        note_id: note.isNew ? null : note.notesId,
        note: note.content,
        content_id: note.contentId,
      }).then((res) => {
        const { code } = res;
        if (code === 200) {
          message.success("保存成功");
        } else {
          message.error("保存失败");
        }
      });
    }, 200);
  };

  // 选中原文指定内容
  const handleSelectNote = (contentId: number) => {
    // 滚动pdf到指定内容
  };

  return (
    <div className={`${style["mce-container"]}`}>
      <div className={`${style["mce-container__header"]}`}>
        {/* <Button type="default" onClick={handleAddNote}>
          新增笔记
        </Button> */}
        <Button type="primary" onClick={handleSaveNote}>
          保存笔记
        </Button>
      </div>
      <List
        dataSource={notes}
        renderItem={(note) => (
          <div className={`${style["mce-container__item"]}`} key={note.notesId}>
            <NoteEditor
              height={700}
              value={note.content}
              contentId={note.contentId}
              notesId={note.notesId}
              onFocus={() => {}}
              onChange={(content) => {
                // 失去焦点
                setCurrentNoteId(-1);
                const currentNote = notes.find(
                  (item) => item.notesId === note.notesId
                );
                if (currentNote) {
                  currentNote.content = content;
                }
              }}
              onNoteBelong={(contentId) => {
                const currentNote = notes.find(
                  (item) => item.notesId === note.notesId
                );
                if (currentNote) {
                  currentNote.contentId = contentId;
                }
              }}
            />
          </div>
        )}
      ></List>
    </div>
  );
}
