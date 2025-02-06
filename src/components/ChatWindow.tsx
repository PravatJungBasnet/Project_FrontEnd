"use client";

import { useState, useEffect } from "react";
import type { FormEvent, ReactNode } from "react";
import { toast } from "react-toastify";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";

import { ChatMessageBubble } from "@/components/ChatMessageBubble";
import { IntermediateStep } from "./IntermediateStep";
import { Button } from "./ui/button";
import { ArrowDown, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Define a Message type
type Message = {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
};

function ChatMessages(props: {
  messages: Message[];
  emptyStateComponent: ReactNode;
  sourcesForMessages: Record<string, any>;
  aiEmoji?: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col max-w-[768px] mx-auto pb-12 w-full">
      {props.messages.map((m, i) => {
        if (m.role === "system") {
          return <IntermediateStep key={m.id} message={m} />;
        }

        const sourceKey = (props.messages.length - 1 - i).toString();
        return (
          <ChatMessageBubble
            key={m.id}
            message={m}
            aiEmoji={props.aiEmoji}
            sources={props.sourcesForMessages[sourceKey]}
          />
        );
      })}
    </div>
  );
}

function ScrollToBottom(props: { className?: string }) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  if (isAtBottom) return null;
  return (
    <Button
      variant="outline"
      className={props.className}
      onClick={() => scrollToBottom()}
    >
      <ArrowDown className="w-4 h-4" />
      <span>Scroll to bottom</span>
    </Button>
  );
}

function ChatInput(props: {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  loading?: boolean;
  placeholder?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        props.onSubmit(e);
      }}
      className={cn("flex w-full flex-col", props.className)}
    >
      <div className="border border-input bg-secondary rounded-lg flex flex-col gap-2 max-w-[768px] w-full mx-auto">
        <textarea
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              props.onSubmit(e as any);
            }
          }}
          className="border-none outline-none bg-transparent p-4"
        />

        <div className="flex justify-between ml-4 mr-2 mb-2">
          <div className="flex gap-3">{props.children}</div>

          <Button
            type="submit"
            className="self-end !py-1 "
            disabled={props.loading}
          >
            {props.loading ? (
              <span role="status" className="flex justify-center">
                <LoaderCircle className="animate-spin" />
                <span className="sr-only">Loading...</span>
              </span>
            ) : (
              <span>Send</span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

function StickyToBottomContent(props: {
  content: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const context = useStickToBottomContext();

  return (
    <div
      ref={context.scrollRef}
      style={{ width: "100%", height: "100%" }}
      className={cn("grid grid-rows-[1fr,auto]", props.className)}
    >
      <div ref={context.contentRef} className={props.contentClassName}>
        {props.content}
      </div>

      {props.footer}
    </div>
  );
}

export function ChatWindow(props: {
  endpoint: string;
  emptyStateComponent: ReactNode;
  placeholder?: string;
  emoji?: string;
  showIngestForm?: boolean;
  showIntermediateStepsToggle?: boolean;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({});

  useEffect(() => {
    // Load messages from local storage on component mount
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    // Save messages to local storage whenever they change
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading || !input.trim()) return;

    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    // Post input and get response
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Authentication token not found");
      }
      const response = await fetch(
        "https://puzan789-operyo.hf.space/translation/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: input }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to get response from the server");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.translated_text,
        role: "assistant",
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      toast.error(
        `Error while processing your request: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StickToBottom>
      <StickyToBottomContent
        className="absolute inset-0"
        contentClassName="py-8 px-2"
        content={
          messages.length === 0 ? (
            <div>{props.emptyStateComponent}</div>
          ) : (
            <ChatMessages
              aiEmoji={props.emoji}
              messages={messages}
              emptyStateComponent={props.emptyStateComponent}
              sourcesForMessages={sourcesForMessages}
            />
          )
        }
        footer={
          <div className="sticky bottom-4 px-2">
            <ScrollToBottom className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4" />
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onSubmit={sendMessage}
              loading={isLoading}
              placeholder={
                props.placeholder ?? "What's it like to be a pirate?"
              }
            ></ChatInput>
          </div>
        }
      ></StickyToBottomContent>
    </StickToBottom>
  );
}
