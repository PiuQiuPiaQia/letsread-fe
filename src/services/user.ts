import { getLRPrefix, request } from "@/utils";

export async function login(data: any) {
  return request(`/user/login`, {
    method: "POST",
    prefix: getLRPrefix(),
    data,
  });
}
