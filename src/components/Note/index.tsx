import React, { useEffect, useState } from "react";
import style from "./index.less";
import NoteEditor from "../NoteEditor";
import { Button } from "antd";
import { getNotes, saveNotes } from "@/services/note";
import { storeContainer } from "@/pages/DashboardCommon/RobotStruct/store";

interface NoteItem {
  id: number;
  content: string;
  isNew: boolean;
}

export default function Note() {
  // 初始化笔记列表状态，每个笔记都有一个唯一的id和内容
  const [notes, setNotes] = useState<NoteItem[]>([]);
  // 初始化下一个笔记的id
  const [nextNoteId, setNextNoteId] = useState(1);
  const { currentFile, rectList, ...args } = storeContainer.useContainer();
  console.log(args);
  console.log(currentFile, rectList);
  useEffect(() => {
    console.log(11111, rectList);
  }, [rectList]);

  useEffect(() => {
    getNotes({ paper_id: 1 }).then((res) => {
      console.log(res);
    });
  });

  // 处理新增笔记的操作
  const handleAddNote = () => {
    const newNote: NoteItem = { id: nextNoteId, content: "", isNew: true };
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
    saveNotes(
      notes.map((note) => {
        return {
          paper_id: currentFile.id,
          notes_id: note.isNew ? null : note.id,
          notes: note.content,
          pos: null,
        };
      })
    );
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
            height={100}
            value={note.content}
            onChange={(content) => handleNoteChange(note.id, content)}
          />
        </div>
      ))}
    </div>
  );
}
