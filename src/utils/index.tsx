export function getFilenameFromContentDisposition(
  cd: string | null,
  fallback = "export.csv",
) {
  if (!cd) return fallback;

  console.log({ cd });

  // filename*=UTF-8''archive%20name.csv
  const star = cd.match(/filename\*\s*=\s*([^']*)''([^;]+)/i);
  if (star) {
    try {
      return decodeURIComponent(star[2]);
    } catch {
      return star[2];
    }
  }
  // filename="name.csv" or filename=name.csv
  const simple = cd.match(/filename\s*=\s*("?)([^";]+)\1/i);
  return simple ? simple[2] : fallback;
}

export function downloadCsv(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
