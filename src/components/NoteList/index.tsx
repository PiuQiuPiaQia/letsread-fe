import { Tabs } from "antd";
import { Collapse, Row, Col } from 'antd';
import { getAllNotes } from "@/services/note";
import { useMount } from "ahooks";
import React, { useEffect, useState } from "react";



const { Panel } = Collapse;

const NoteList: React.FC = () => {
  const [noteList,setNoteList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useMount(() => {
    getNoteList();
  });
  const getNoteList = async () => {
    setLoading(true);
    getAllNotes().then((res) => {
      console.log(res.notes);
      const resNotes:any = res.notes;
      const groupedCollection = resNotes.reduce((result, obj) => {
        const key = obj.paper_id;
        if (!result[key]) {
          result[key] = {
            paper_id: key,
            paper_name: obj.paper_name,
            notes: [] as Array<{ note_id: string; note: string }>
          };
        }
        result[key].notes.push(obj);
        return result;
      }, {} as { [key: string]: { paper_id: string; paper_name: string; notes: Array<{note_id: string; note: string }> } });
      
      let collection = [];
      Object.keys(groupedCollection).forEach(key => {
        collection.push(groupedCollection[key]);
      });
      console.log(collection);

      setNoteList(collection);
      setLoading(false);
    });
  };
  
  function callback(key) {
    console.log(key);
  }

  return (
    <>
      {/* <Tabs tabPosition={"left"} items={tabList} /> */}
      <Collapse defaultActiveKey={['1']} onChange={callback}>
        {  
          noteList.map((item)=>{ 
            return (
            <Panel header={item.paper_name} key={item.paper_id}>
              {item.notes.map((note)=>{
                  return( 
                    <Row>
                      <Col span={20}>{note.note}</Col>
                      <Col span={4}>{note.updated_at}</Col>
                    </Row>
                  )
              })}
            </Panel>)
            
          })
        }
      </Collapse>
    </>
  );
};

export default NoteList;
