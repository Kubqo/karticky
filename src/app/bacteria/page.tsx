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
    "Původce",
    "Koho postihuje?",
    "Kedy ? ( iné faktory ? )",
    "Histologické vyšetrenie",
    "patologie",
  ];

  useEffect(() => {
    importCsvAsString("/csv/bacteria.csv")
      .then((data) => {
        Papa.parse(data, {
          delimiter: ",",
          complete: function (results) {
            let data = (results.data as string[][]).filter(
              (d) => d.length > 1
            ) as any;
            const formattedData: string[][] = [];

            for (let i = 0; i < data.length; i++) {
              if (data[i][1] === "") {
                if (i > 0) {
                  // Check if there is a previous row
                  for (let j = 2; j < data[i].length; j++) {
                    if (
                      formattedData.length > 0 &&
                      formattedData[formattedData.length - 1][j].length > 0
                    ) {
                      // Check if formattedData[i - 1][j] exists before appending
                      formattedData[formattedData.length - 1][j] +=
                        " " + data[i][j];
                    }
                  }
                }
              } else {
                // Add the entire row as-is if index 1 is not empty
                formattedData.push([...data[i]]);
              }
            }

            setData(formattedData);
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
