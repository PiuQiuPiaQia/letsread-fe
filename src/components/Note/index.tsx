import { storeContainer } from "@/pages/DashboardCommon/RobotStruct/store";
import { getNotes, saveNotes } from "@/services/note";
import { Button } from "antd";
import { useEffect, useMemo, useState } from "react";
import NoteEditor from "../NoteEditor";
import style from "./index.less";

interface NoteItem {
  id: number;
  content: string;
  isNew: boolean;
  contentId: number;
}

export default function Note() {
  // 初始化笔记列表状态，每个笔记都有一个唯一的id和内容
  const [notes, setNotes] = useState<NoteItem[]>([]);
  // 当前编辑的笔记
  const [currentNoteId, setCurrentNoteId] = useState<number>(-1);
  // 初始化下一个笔记的id
  const [nextNoteId, setNextNoteId] = useState(1);
  const { currentFile, rectList, curUid, ...args } =
    storeContainer.useContainer();
  // console.log(2222, args);
  console.log(currentFile, rectList);
  useEffect(() => {
    console.log("curUid", curUid);
  }, [curUid]);

  useMemo(() => {
    getNotes({ paper_id: 1 }).then((res) => {
      console.log(res);
    });
  }, [currentFile]);

  // 处理新增笔记的操作
  const handleAddNote = () => {
    const newNote: NoteItem = {
      id: nextNoteId,
      content: "",
      isNew: true,
      contentId: -1,
    };
    setNotes([...notes, newNote]); // 将新笔记添加到列表中
    setNextNoteId(nextNoteId + 1); // 更新下一个笔记的id
  };

  // 处理编辑笔记内容的变化
  const handleNoteChange = (id: number, content: string) => {
    console.log(content);

    setNotes(
      notes.map((note) => (note.id === id ? { ...note, content } : note))
    );
  };

  // 处理保存笔记的操作
  const handleSaveNote = () => {
    console.log("保存笔记");
    setTimeout(() => {
      saveNotes({
        data: notes.map((note) => {
          return {
            paper_id: currentFile.id,
            notes_id: note.isNew ? null : note.id,
            notes: note.content,
            content_id: note.contentId,
          };
        }),
      });
    }, 200);
  };

  return (
    <div className={`${style["mce-container"]}`}>
      <Button type="primary" onClick={handleAddNote}>
        新增笔记
      </Button>
      <Button type="primary" onClick={handleSaveNote}>
        保存笔记
      </Button>

      {notes.map((note) => (
        <div className={`${style["mce-container__item"]}`} key={note.id}>
          <NoteEditor
            height={200}
            value={note.content}
            contentId={curUid}
            onChange={(content) => {
              // 失去焦点
              setCurrentNoteId(-1);
              handleNoteChange(note.id, content);
            }}
            onNoteBelong={(contentId) => {
              const currentNote = notes.find((item) => item.id === note.id);
              if (currentNote) {
                currentNote.contentId = contentId;
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
