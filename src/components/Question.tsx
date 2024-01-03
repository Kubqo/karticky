"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  addToIncorrectQuestions,
  deleteIncorrectQuestion,
  getAllIncorrectQuestion,
} from "@/api/db";
import { useUser } from "@/hooks/userContext";
import { shuffle } from "@/utils/shuffle";
import { QuestionType } from "@/types/Question";
import Image from "next/image";

type Props = {
  data: QuestionType[];
  tableHeaders: string[];
  questionType: "viruses" | "bacteria" | "parasites";
};

export default function Question({ data, tableHeaders, questionType }: Props) {
  const user = useUser();
  const [mode, setMode] = useState<"card" | "row">("row");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [answeringMode, setAnsweringMode] = useState<
    "normal" | "incorrect" | "success"
  >("normal");

  const [incorrectQuestions, setIncorrectQuestions] = useState<QuestionType[]>(
    []
  );

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
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
  console.log(data);

  console.log(currentQuestionIndex, question?.question[1]);

  useEffect(() => {
    const getIncorrectQuestions = async () => {
      const incorrectQuestions = await getAllIncorrectQuestion(
        user?.uid ?? "",
        questionType
      );

      if (incorrectQuestions.length !== 0) {
        const qs = shuffle(incorrectQuestions);

        setIncorrectQuestions(qs);

        setAnsweringMode("incorrect");
      }
    };

    getIncorrectQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getQuestion = useCallback(async () => {
    setIsLoading(true);
    if (answeringMode === "normal") {
      if (currentQuestionIndex === data.length - 1) {
        setAnsweringMode("incorrect");
        const incorrectQuestionsRes = await getAllIncorrectQuestion(
          user?.uid ?? "",
          questionType
        );

        setShowAnswer(false);
        setIncorrectQuestions(shuffle(incorrectQuestionsRes));
        setCurrentQuestionIndex(0);

        setIsLoading(false);
        return;
      }
    } else {
      if (currentQuestionIndex === incorrectQuestions.length - 1) {
        const incorrectQuestionsRes = await getAllIncorrectQuestion(
          user?.uid ?? "",
          questionType
        );

        if (incorrectQuestionsRes.length === 0) {
          setAnsweringMode("success");
          setIsLoading(false);

          return;
        }

        setIncorrectQuestions(shuffle(incorrectQuestionsRes));
        setCurrentQuestionIndex(0);
        setQuestion(incorrectQuestionsRes[0] as unknown as QuestionType);

        setIsLoading(false);
        return;
      }
    }

    setShowAnswer(false);

    if (mode === "card") {
      setCol(Math.floor(Math.random() * 5));
    }

    setQuestion(
      (answeringMode === "normal" ? data : incorrectQuestions)[
        currentQuestionIndex
      ] as unknown as QuestionType
    );

    setCurrentQuestionIndex((prev) => prev + 1);

    setIsLoading(false);
  }, [
    answeringMode,
    currentQuestionIndex,
    data,
    incorrectQuestions,
    mode,
    questionType,
    user?.uid,
  ]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-xl font-bold text-[#ff6188] text-center">
          loading
        </div>
      </div>
    );
  }

  if (answeringMode === "success") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-xl font-bold text-[#ff6188] text-center">
          Všetky otázky boli zodpovedané správne
        </div>
        <Image alt="logo" src="/cow.gif" width={500} height={500} />
      </div>
    );
  }

  if (
    answeringMode === "incorrect" &&
    incorrectQuestions.length === currentQuestionIndex
  ) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-3xl font-bold text-[#ff6188]">
          Režim nesprávne zodpovedaných otázok
        </div>
        <div className="text-xl font-bold text-[#ff6188] text-center">
          Všetky otázky boli zodpovedané
        </div>
        <div className="text-xl font-bold text-[#ff6188] text-center">
          zostáva {incorrectQuestions.length} nesprávne otázoky
        </div>
        <Button className="text-green-500" onClick={getQuestion}>
          Pokračovať s nesprávnymi otázkami
        </Button>
      </div>
    );
  }

  return (
    <>
      {answeringMode === "incorrect" && (
        <div>
          <div className="text-3xl font-bold text-[#ff6188]">
            Režim nesprávne zodpovedaných otázok
          </div>
          <div className="text-xl font-bold text-[#ff6188] text-center">
            zostáva {incorrectQuestions.length} otázok
          </div>
        </div>
      )}
      {question && (
        <div>
          {currentQuestionIndex} /{" "}
          {answeringMode === "normal" ? data.length : incorrectQuestions.length}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Checkbox checked={mode === "row"} onClick={() => setMode("row")} />
        Tabulka
        <Checkbox checked={mode === "card"} onClick={() => setMode("card")} />
        Karticka
      </div>
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
      {mode === "card" && question && (
        <div className="flex items-center flex-col gap-8">
          {question?.question?.length > 0 && (
            <>
              <div className="text-3xl font-bold text-center">
                {question.question[1]}
              </div>
              <div className=" text-xl font-bold">{tableHeaders[col + 1]}</div>
            </>
          )}

          {showAnswer && (
            <>
              <div className="text-green-500 text-xl font-bold text-center">
                {question.question[col + 2]}
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
                    {question.question.map((cell, cellIndex) =>
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
      {mode === "row" && question && (
        <table>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {question && question.question?.[0] !== "" ? (
              <>
                {question.question?.[0].split(",").map((cell) => (
                  <tr key={cell} style={{ border: "1px solid black" }}>
                    {data[parseInt(cell) - 1].question.map((cell, cellIndex) =>
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
                {question.question.map((cell, cellIndex) =>
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
      {question && (
        <div className="flex w-full gap-12 justify-center">
          <Button
            className="bg-red-700"
            disabled={!user?.uid}
            onClick={async () => {
              if (answeringMode === "normal") {
                await addToIncorrectQuestions(
                  question.question,
                  user?.uid ?? "",
                  questionType
                );
              }

              getQuestion();
            }}
          >
            Neviem
          </Button>
          <Button
            className="bg-green-700"
            onClick={async () => {
              if (answeringMode === "incorrect") {
                deleteIncorrectQuestion(
                  user?.uid ?? "",
                  question?.id ?? "",
                  questionType
                );
              }

              getQuestion();
            }}
          >
            Viem
          </Button>
        </div>
      )}
    </>
  );
}
