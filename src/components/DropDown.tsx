"use client";

import React, { useState, useEffect } from "react";
import useLogout from "@/hooks/use-logout";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CheckCheck, Copy } from "lucide-react";

const DropDown = () => {
  const { onSubmit: onLogout } = useLogout();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copy, setcopy] = useState(false);

  useEffect(() => {
    fetchApiKey();
  }, []);

  const fetchApiKey = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        //"https://puzan789-operyo.hf.space/src/apikey",
        "https://puzan789-operyo.hf.space/src/apikey",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setApiKey(data.key);
      } else {
        setApiKey(null);
      }
    } catch (error) {
      console.error("Error fetching API key:", error);
      setApiKey(null);
    }
  };

  const createApiKey = async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        //"https://puzan789-jaerowai.hf.space/src/apikey/create",
        "https://puzan789-operyo.hf.space/src/apikey/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setApiKey(data.key);
      }
    } catch (error) {
      console.error("Error creating API key:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteApiKey = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        "https://puzan789-jaerowai.hf.space/src/apikey/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setApiKey(null);
      }
    } catch (error) {
      console.error("Error deleting API key:", error);
    }
  };

  const copyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setcopy(true);
    }
  };

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={createApiKey}>
          {loading ? "Loading..." : "Create APIkey"}
        </DropdownMenuItem>
        {apiKey && (
          <>
            <div className="my-2">
              <div className="flex items-center space-x-0">
                <Input value={apiKey} readOnly className="w-full" />
                <Button size="icon" variant="ghost" onClick={copyApiKey}>
                  {copy ? (
                    <CheckCheck className="h-4 w-4 text-white"/>
                  ) : (
                    <Copy className="h-4 w-4 text-white" />
                  )}
                </Button>
              </div>
            </div>
            <DropdownMenuItem onClick={deleteApiKey}>
              Delete Token
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
    </>
  );
};

export default DropDown;
