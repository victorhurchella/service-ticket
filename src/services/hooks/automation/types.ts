export interface IAutomationReturn {
  exportedCount: number;
  processedDistribution: {
    PENDING: number;
    OPEN: number;
    CLOSED: number;
  };
  importResult: {
    updatedCount: number;
    skippedCount: number;
    totalRows: number;
  };
  timestamps: {
    startedAt: string;
  };
}
