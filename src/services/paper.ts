import type { IResponse } from "@/utils";
import { getLRPrefix, request } from "@/utils";

export async function getPapers() {
  return request<
    IResponse & {
      papers: {
        abstract: string;
        authors: string;
        created_at: string;
        file_path: string;
        paper_id: number;
        publish_date: string;
        title: string;
      }[];
    }
  >(`/paper/get`, {
    method: "GET",
    prefix: getLRPrefix(),
    params: {},
    lrToken: true,
  });
}

export async function uploadPaper(body: any) {
  return request<IResponse>(`/paper/upload`, {
    method: "POST",
    prefix: getLRPrefix(),
    body: body,
    lrToken: true,
  });
}

export async function deletePaper(data) {
  return request<IResponse>(`/paper/delete`, {
    method: "POST",
    prefix: getLRPrefix(),
    data,
    lrToken: true,
  });
}

export async function parsePaper(data: { paper_id: number }) {
  return request<IResponse>(`/paper/parse`, {
    method: "GET",
    prefix: getLRPrefix(),
    params: data,
    lrToken: true,
  });
}
