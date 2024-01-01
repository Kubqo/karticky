"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  data: string[][];
  tableHeaders: string[];
  mode: "card" | "row";
};

export default function Question({ data, tableHeaders, mode }: Props) {
  const [question, setQuestion] = useState<string[]>([]);
  const [col, setCol] = useState<number>(2);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const [activeTableCols, setActiveTableCols] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const getQuestion = () => {
    setShowAnswer(false);
    let random = Math.floor(Math.random() * data.length);

    setQuestion(data[random]);
    if (mode === "card") {
      setCol(Math.floor(Math.random() * 5));
    }
  };

  return (
    <>
      {mode === "row" && (
        <div className="flex gap-2 items-center">
          {tableHeaders.map((header, index) => (
            <div key={index} className="flex gap-2 items-center ">
              <Checkbox
                checked={activeTableCols[index]}
                onClick={() => {
                  let newActiveTableCols = [...activeTableCols];
                  newActiveTableCols[index] = !newActiveTableCols[index];
                  setActiveTableCols(newActiveTableCols);
                }}
              />
              {header}
            </div>
          ))}
        </div>
      )}

      <div className="gap-4 flex">
        <Button onClick={() => getQuestion()}>get question</Button>

        <Button
          className="text-green-500"
          onClick={() => setShowAnswer((prev) => !prev)}
        >
          {showAnswer ? "hide answer" : "show answer"}
        </Button>
      </div>

      {mode === "card" && (
        <div className="flex items-center flex-col gap-8">
          {question.length > 0 && (
            <>
              <div className="text-3xl font-bold text-center">
                {question[1]}
              </div>
              <div className=" text-xl font-bold">{tableHeaders[col + 1]}</div>
            </>
          )}

          {showAnswer && (
            <>
              <div className="text-green-500 text-xl font-bold text-center">
                {question[col + 2]}
              </div>
              <table>
                <thead>
                  <tr>
                    {tableHeaders.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ border: "1px solid black" }}>
                    {question.map((cell, cellIndex) =>
                      cellIndex !== 0 && cellIndex !== 7 ? (
                        <td
                          style={{ border: "1px solid black" }}
                          key={cellIndex}
                        >
                          {cell}
                        </td>
                      ) : null
                    )}
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      )}

      {mode === "row" && question.length > 0 && (
        <table>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {question[0] !== "" ? (
              <>
                {question[0].split(",").map((cell) => (
                  <tr key={cell} style={{ border: "1px solid black" }}>
                    {data[parseInt(cell) - 1].map((cell, cellIndex) =>
                      cellIndex !== 0 && cellIndex !== 7 ? (
                        <td className="border-2 border-black" key={cellIndex}>
                          {!activeTableCols[cellIndex - 1] && !showAnswer
                            ? "-"
                            : cell}
                        </td>
                      ) : null
                    )}
                  </tr>
                ))}
              </>
            ) : (
              <tr style={{ border: "1px solid black" }}>
                {question.map((cell, cellIndex) =>
                  cellIndex !== 0 && cellIndex !== 7 ? (
                    <td className="border-2 border-black" key={cellIndex}>
                      {!activeTableCols[cellIndex - 1] && !showAnswer
                        ? "-"
                        : cell}
                    </td>
                  ) : null
                )}
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}
