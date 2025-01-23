"use client";
import { ChatWindow } from "@/components/ChatWindow";
import { GuideInfoBox } from "@/components/GuideInfo";
import LayoutTemplate from "@/components/LayoutTemplate";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token || token.length < 5) {
      router.replace("/signup");
    }
  }, [router]);
  const InfoCard = (
    <GuideInfoBox>
      <div className="max-w-4xl mx-auto p-6  rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center mb-8">
          
          <div className=" md:pl-8">
            <h2 className="text-3xl font-bold mb-4 text-indigo-600">
              Welcome to Our AI Chat App
            </h2>
            <p className="text-white mb-4">
              Experience the future of conversation with our cutting-edge
              AI-powered chat application.
            </p>
          </div>
        </div>
        <ul className="space-y-4">
          
          <li className="flex items-start justify-center">
            <span className="text-2xl mr-4">🚀</span>
            <span>
              Built with the latest technologies including Next.js and advanced language models.
            </span>
          </li>
        </ul>
      </div>
    </GuideInfoBox>
  );
  return (
    <>
      <LayoutTemplate>
        <ChatWindow
          endpoint="api/chat"
          emoji="💬"
          placeholder="I'm an LLM to change english message to nepali"
          emptyStateComponent={InfoCard}
        />
      </LayoutTemplate>
    </>
  );
}
