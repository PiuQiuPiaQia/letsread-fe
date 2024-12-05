import { getLRPrefix, request } from "@/utils";
import type { IResponse } from "@/utils";

interface TranslateResponse extends IResponse {
  trans_result: string;
}

export function translateText(data: any) {
  return request<TranslateResponse>(`/trans/textTranslation`, {
    method: "POST",
    prefix: getLRPrefix(),
    data,
    lrToken: true,
  });
}
