"use client";

import importCsvAsString from "@/lib/csvImporter";
import { useEffect, useState } from "react";
import Papa from "papaparse";

import Header from "@/components/nav/Header";
import Question from "@/components/Question";
import { useUser } from "@/hooks/userContext";
import { redirect } from "next/navigation";
import { shuffle } from "../../utils/shuffle";
import { formatData } from "@/utils/formatData";
import { QuestionType } from "@/types/Question";

export default function Home() {
  const [data, setData] = useState<QuestionType[]>([]);
  const user = useUser();

  const tableHeaders = [
    "Ochorenie",
    "Zařazení",
    "o původci",
    "Koho a aký orgán postihuje?",
    "Špecifikácia ?? / vývojový cyklus",
    "patologie",
  ];

  useEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    importCsvAsString("/csv/parasites.csv")
      .then((data) => {
        Papa.parse(data, {
          delimiter: ",",
          complete: function (results) {
            let data = (results.data as string[][]).filter(
              (d) => d.length > 1
            ) as any;

            shuffle(data);
            setData(formatData(data));
          },
        });
      })
      .catch((error) => {
        console.error("Error importing CSV:", error);
      });
  }, []);

  return (
    <div className="h-screen w-screen  flex flex-col items-center border-2 gap-4">
      <Header />
      <Question
        data={data}
        tableHeaders={tableHeaders}
        questionType="parasites"
      />
    </div>
  );
}
