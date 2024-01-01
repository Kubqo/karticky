"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen  flex flex-col items-center border-2 gap-4">
      <div className="w-screen border-2 static p-2 flex flex-row justify-between items-center">
        <Image alt="logo" src="/uwu.png" width={80} height={10} />

        <div className="w-[177px]" />
      </div>
      <div className="text-3xl font-bold text-[#ff6188]">Vyber si tému:</div>
      <div>
        <div className="flex gap-4">
          <a href="/viruses" className="font-bold">
            Viry
          </a>
          <a href="/bacteria" className="font-bold">
            Bakterie
          </a>
          <a href="/parasites" className="font-bold">
            Parazity
          </a>
        </div>
      </div>
    </div>
  );
}
