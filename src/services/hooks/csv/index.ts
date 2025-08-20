import { queryClient } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import {
  getPendingCSV,
  postAutoProcessCSV,
  postImportProcessedCSV,
} from "./api";

export function useExportPendingCsv() {
  return useMutation(
    {
      mutationFn: async () => getPendingCSV(),
    },
    queryClient,
  );
}

export function useAutoProcessCsv() {
  return useMutation(
    {
      mutationFn: async (file: File) => postAutoProcessCSV(file),
    },
    queryClient,
  );
}

export function useImportProcessedCsv() {
  return useMutation(
    {
      mutationFn: async (file: File) => postImportProcessedCSV(file),
    },
    queryClient,
  );
}
