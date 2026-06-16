import Papa from "papaparse";

export async function loadDataset() {
  const response = await fetch("/data/final_scored_dataset.csv");
  const csvText = await response.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  return parsed.data;
}