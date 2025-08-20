import {
  useAutoProcessCsv,
  useExportPendingCsv,
  useImportProcessedCsv,
} from "@/services/hooks/csv";
import { downloadCsv } from "@/utils";
import { useState } from "react";
import * as S from "../styles/ui";

export function CsvPage() {
  const { mutateAsync: exportPending, isPending: isPendingExport } =
    useExportPendingCsv();

  const { mutateAsync: autoProcess, isPending: isPendingAutoProcess } =
    useAutoProcessCsv();

  const {
    data: importedResult,
    mutateAsync: importProcessed,
    isPending: isPendingImportProcessed,
  } = useImportProcessedCsv();

  const [error, setError] = useState<string | null>("");
  const [pendingCsv, setPendingCsv] = useState<Blob | null>(null);
  const [processedCsv, setProcessedCsv] = useState<Blob | null>(null);

  async function handleExport() {
    const { blob, filename } = await exportPending();

    setPendingCsv(blob);
    downloadCsv(blob, filename);

    setError(null);
  }

  async function handleAutoProcess() {
    const file = pendingCsv && new File([pendingCsv], "pending.csv");

    if (!file) {
      setError("You need export pending first!");
      return;
    }

    const blob = await autoProcess(file);
    setProcessedCsv(blob);
    setError(null);
  }

  async function handleImport() {
    if (!processedCsv) return;

    const file = new File([processedCsv], "processed.csv");
    await importProcessed(file);

    setError(null);
  }

  return (
    <S.Card>
      <h2>CSV</h2>

      <S.RowData>
        <S.Button onClick={handleExport}>Export Pending</S.Button>

        <S.Button
          variant="secondary"
          disabled={!pendingCsv}
          onClick={() => handleAutoProcess()}
        >
          Auto-Process (last export)
        </S.Button>

        <S.Button onClick={handleImport} disabled={!processedCsv}>
          Import Auto-Processed
        </S.Button>
      </S.RowData>

      {(isPendingExport ||
        isPendingAutoProcess ||
        isPendingImportProcessed) && <S.Badge>Working…</S.Badge>}

      {error && (
        <S.Badge style={{ color: "crimson", background: "#fde2e2" }}>
          {error}
        </S.Badge>
      )}

      {importedResult && <pre>{JSON.stringify(importedResult, null, 2)}</pre>}
    </S.Card>
  );
}
