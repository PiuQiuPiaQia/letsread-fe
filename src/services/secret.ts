import { getLRPrefix, request } from "@/utils";

export async function getKeyByName(data: any) {
  return request(`/api/get_key`, {
    method: "GET",
    prefix: getLRPrefix(),
    params: {
      name: data.name,
    },
    lrToken: true,
  });
}
export async function storeKeyByName(data: any) {
  return request(`/api/store_key`, {
    method: "POST",
    prefix: getLRPrefix(),
    data,
    lrToken: true,
  });
}



