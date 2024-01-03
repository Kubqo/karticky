"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useUser } from "@/hooks/userContext";
import { logout, signInWithGooglePopup } from "@/api/auth";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
  const user = useUser();
  const [pathname, setPathname] = useState<string>("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div className="w-screen border-2 static p-2 flex flex-row justify-between items-center">
      <Image alt="logo" src="/uwu.png" width={80} height={10} />
      {user && (
        <div className="flex gap-4">
          <Link
            href="/viruses"
            className={`font-bold ${
              pathname === "/viruses" ? "text-[#ff6188]" : ""
            }`}
          >
            Viry
          </Link>
          <Link
            href="/bacteria"
            className={`font-bold ${
              pathname === "/bacteria" ? "text-[#ff6188]" : ""
            }`}
          >
            Bakterie
          </Link>
          <Link
            href="/parasites"
            className={`font-bold ${
              pathname === "/parasites" ? "text-[#ff6188]" : ""
            }`}
          >
            Parazity
          </Link>
        </div>
      )}

      <div className="flex items-center gap-2">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={user?.photoURL ?? ""} alt="@shadcn" />
                <AvatarFallback>-</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem disabled>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={signInWithGooglePopup}>login</Button>
        )}
      </div>
    </div>
  );
}
