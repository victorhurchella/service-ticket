import { api } from "@/services/api";
import { getFilenameFromContentDisposition } from "@/utils";
import type { IImportProcessedReturn } from "./types";

export async function getPendingCSV() {
  const response = await api.get("/csv/export/pending", {
    responseType: "blob",
    headers: { Accept: "text/csv" },
  });

  const cd = response.headers["content-disposition"] as string | undefined;
  console.log(response.headers);
  const filename = getFilenameFromContentDisposition(cd ?? null, "tickets.csv");

  return { blob: response.data as Blob, filename };
}

export async function postAutoProcessCSV(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/csv/auto-process", formData);
  return data;
}

export async function postImportProcessedCSV(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post<IImportProcessedReturn>(
    "/csv/import",
    formData,
  );

  return data;
}
