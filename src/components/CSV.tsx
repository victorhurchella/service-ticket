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

  async function handleImport(f?: File) {
    const file = f || processedCsv;

    if (!file) return;

    const fileToImport = new File([file], "processed.csv");
    await importProcessed(fileToImport);

    setError(null);
  }

  return (
    <S.Card>
      <h2>CSV</h2>

      <S.RowData>
        <S.Button onClick={handleExport}>Export Pending Tickets</S.Button>

        <S.Button
          variant="secondary"
          disabled={!pendingCsv}
          onClick={() => handleAutoProcess()}
        >
          Auto-Process 33/33/34 (last export)
        </S.Button>

        <S.Button onClick={() => handleImport()} disabled={!processedCsv}>
          Import - Auto Processed
        </S.Button>
      </S.RowData>

      <S.RowData style={{ paddingTop: "16px" }}>
        <label>
          <input
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImport(f);
            }}
          />
          <S.Button as="span" variant="secondary">
            Import Manually Processed CSV
          </S.Button>
        </label>
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
