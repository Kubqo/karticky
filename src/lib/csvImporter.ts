// CsvImporter.tsx

async function importCsvAsString(file: string): Promise<string> {
  const csvFilePath = window.location.origin + file;

  const response = await fetch(csvFilePath);
  if (!response.ok) {
    throw new Error("Failed to fetch CSV");
  }
  const data = await response.text();
  return data;
}

export default importCsvAsString;
