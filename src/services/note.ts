import { getLRPrefix, request } from "@/utils";
import type { IResponse } from "@/utils";

export async function getNotes(data: any) {
  return request<IResponse>(`/notes/list`, {
    method: "GET",
    prefix: getLRPrefix(),
    params: {
      paper_id: data.paper_id,
    },
    lrToken: true,
  });
}
export async function saveNotes(data: any) {
  return request<IResponse>(`/notes/save`, {
    method: "POST",
    prefix: getLRPrefix(),
    data,
    lrToken: true,
  });
}
export async function getAllNotes() {
  return request<IResponse>(`/notes/listByUser`, {
    method: "GET",
    prefix: getLRPrefix(),
    lrToken: true,
  });
}

// 1. 查看论文的所有笔记-GET-notes/list
// http://127.0.0.1:8000/notes/list?paper_id=1

// {
//     "code": 200,
//     "notes": [
//         {
//             "note_id": "1",
//             "note": "这是新的笔记内容",
//             "pos": [
//                 1,
//                 1,
//                 1,
//                 1,
//                 1,
//                 1,
//                 1,
//                 1
//             ],
//             "created_at": "2024-11-05 03:52:44",
//             "updated_at": "2024-11-05 05:07:38"
//         },
//         {
//             "note_id": "2",
//             "note": "测试note2: 深度学习的架构设计有新的见解。",
//             "pos": [
//                 2,
//                 3,
//                 4,
//                 5,
//                 6,
//                 7,
//                 8,
//                 9
//             ],
//             "created_at": "2024-11-05 03:52:44",
//             "updated_at": "2024-11-05 03:52:44"
//         },
//         {
//             "note_id": "6",
//             "note": "新增：这是新的笔记内容",
//             "pos": [
//                 1,
//                 1,
//                 1,
//                 1,
//                 1,
//                 1,
//                 1,
//                 1
//             ],
//             "created_at": "2024-11-05 05:09:01",
//             "updated_at": "2024-11-05 05:09:01"
//         }
//     ]
// }

// 2. 新增或更新笔记- POST
// http://127.0.0.1:8000/notes/save
// {
//   "paper_id": "1",
//   "note_id": "",   //空为新增
//   "note": "新增：这是新的笔记内容",
//   "pos": [1, 1, 1, 1, 1, 1, 1, 1]
// }

// 返回：
// {
//     "code": 201,
//     "note_id": "7",
//     "message": "笔记新增成功",
//     "created_at": "2024-11-05 05:28:17",
//     "updated_at": "2024-11-05 05:28:17"
// }
