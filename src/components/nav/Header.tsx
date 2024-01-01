"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

type Props = {
  mode: "card" | "row";
  setMode: (mode: "card" | "row") => void;
};

export default function Header({ mode, setMode }: Props) {
  // State to store parsed data

  const [pathname, setPathname] = useState<string>("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div className="w-screen border-2 static p-2 flex flex-row justify-between items-center">
      <Image alt="logo" src="/uwu.png" width={80} height={10} />

      <div className="flex gap-4">
        <a
          href="/viruses"
          className={`font-bold ${
            pathname === "/viruses" ? "text-[#ff6188]" : ""
          }`}
        >
          Viry
        </a>
        <a
          href="/bacteria"
          className={`font-bold ${
            pathname === "/bacteria" ? "text-[#ff6188]" : ""
          }`}
        >
          Bakterie
        </a>
        <a
          href="/parasites"
          className={`font-bold ${
            pathname === "/parasites" ? "text-[#ff6188]" : ""
          }`}
        >
          Parazity
        </a>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox checked={mode === "row"} onClick={() => setMode("row")} />
        Tabulka
        <Checkbox checked={mode === "card"} onClick={() => setMode("card")} />
        Karticka
      </div>
    </div>
  );
}
