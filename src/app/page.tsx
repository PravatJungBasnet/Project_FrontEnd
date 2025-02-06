import { ChatWindow } from "@/components/ChatWindow";
import { GuideInfoBox } from "@/components/GuideInfo";
import LayoutTemplate from "@/components/LayoutTemplate";

export default function Home() {
  const InfoCard = (
    <GuideInfoBox>
      <div className="max-w-4xl mx-auto p-6  rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className=" md:pl-8">
            <h2 className="text-3xl font-bold mb-4 text-indigo-600">
            Welcome to our English-to-Nepali Language Translator!           
             </h2>
            <p className="text-white mb-4">
            This system helps you translate English text into Nepali quickly.
            </p>
          </div>
        </div>
        <ul className="space-y-4">
          <li className="flex items-start justify-center">
            <span className="text-2xl mr-4">🚀</span>
            <span>
              
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
          placeholder="I'm a translator to translate english to nepali"
          emptyStateComponent={InfoCard}
        />
      </LayoutTemplate>
    </>
  );
}
