import { getLRPrefix} from "@/utils";

export async function getMessages(data:string) {
  return fetch(`${getLRPrefix()}/moonshot/paper_qa`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: data,
  });
}