"use client";

import Header from "@/components/nav/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen  flex flex-col items-center border-2 gap-4">
      <Header />
      <Image alt="logo" src="/cow.gif" width={500} height={500} />
    </div>
  );
}
