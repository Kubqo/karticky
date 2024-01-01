"use client";

import importCsvAsString from "@/lib/csvImporter";
import { useEffect, useState } from "react";
import Papa from "papaparse";

import Header from "@/components/nav/Header";
import Question from "@/components/Question";

export default function Home() {
  const [data, setData] = useState<string[][]>([]);
  const [mode, setMode] = useState<"card" | "row">("row");

  const tableHeaders = [
    "Ochorenie",
    "Zařazení",
    "o původci",
    "Koho a aký orgán postihuje?",
    "Špecifikácia ?? / vývojový cyklus",
    "patologie",
  ];

  useEffect(() => {
    importCsvAsString("/csv/parasites.csv")
      .then((data) => {
        Papa.parse(data, {
          delimiter: ",",
          complete: function (results) {
            let data = (results.data as string[][]).filter(
              (d) => d.length > 1
            ) as any;

            setData(data);
          },
        });
      })
      .catch((error) => {
        console.error("Error importing CSV:", error);
      });
  }, []);

  return (
    <div className="h-screen w-screen  flex flex-col items-center border-2 gap-4">
      <Header mode={mode} setMode={setMode} />
      <Question data={data} tableHeaders={tableHeaders} mode={mode} />
    </div>
  );
}
