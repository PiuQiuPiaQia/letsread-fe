import { getLRPrefix, request } from "@/utils";
import { getToken } from "@/utils/storage";
export async function getMessages(data:string) {
  return fetch(`${getLRPrefix()}/moonshot/paper_qa`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + getToken(),
    },
    body: data,
  });
}
export async function getInitMessages() {
  return request(`${getLRPrefix()}/moonshot/paper_qa_init`, {
    method: "GET",
    prefix: getLRPrefix(),
    lrToken: true,
  });
}