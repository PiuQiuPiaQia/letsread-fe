import { getLRPrefix, request } from "@/utils";

export async function login(data: any) {
  return request(`/user/login`, {
    method: "POST",
    prefix: getLRPrefix(),
    data,
  });
}
export async function getMessages(data: any) {
  return request(`/moonshot/paper_qa`, {
    method: "POST",
    prefix: getLRPrefix(),
    data,
  });
}



