import { ActiveLink } from "@/components/ActiveLinks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import LogOut from "./DropDown";
import { useEffect, useState } from "react";

export default function LayoutTemplate({
  children,
}: {
  children: React.ReactNode;
}) 
  {
    const [username, setUsername] = useState<string | null>(null);
  
    // Fetch the username from localStorage or an API
    useEffect(() => {
      // Example: Replace this with your logic for fetching user data)
      const storedUsername = localStorage.getItem("username");
      console.log("Stored username:", storedUsername); // Assuming username is stored in localStorage
      setUsername(storedUsername || "Guest"); // Default to "Guest" if no username is found
    }, [username]);
  
  return (
    <div className="bg-secondary grid grid-rows-[auto,1fr] h-[100dvh]">
      <div className="grid grid-cols-[1fr,auto] gap-2 sm:mx-10 px-4 py-2">
        <div className="flex gap-4 flex-col md:flex-row md:items-center">
          <nav className="md:flex gap-1 flex-col md:flex-row hidden">
            <ActiveLink href="/">🏴‍☠️ Chat</ActiveLink>
          </nav>
        </div>

        <div className="flex justify-center items-center gap-3 ">
          <div className="md:flex hidden">{username}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={"/profile.gif"}
                alt=""
                width={99999}
                height={99999}
                style={{ height: "2rem", aspectRatio: 1 / 1 }}
                className="w-8 h-8 bg-white rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] mr-4">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuLabel><div className="flex md:hidden">{username}</div></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <LogOut />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="bg-background mx-4 relative grid rounded-t-2xl border border-input border-b-0">
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  );
}
