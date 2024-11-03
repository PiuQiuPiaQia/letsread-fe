import { getLRPrefix, request } from "@/utils";
import type { IResponse } from "@/utils";

export async function login(data: any) {
  return request<IResponse>(`/user/login`, {
    method: "POST",
    prefix: getLRPrefix(),
    data,
  });
}
