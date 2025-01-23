import { cn } from "@/lib/utils";

export function ChatMessageBubble(props: {
  message: any;
  aiEmoji?: string;
  sources: any[];
}) {
  return (
    <div
      className={cn(
        `rounded-[24px] items-center max-w-[80%] mb-8 flex`,
        props.message.role === "user"
          ? "bg-secondary text-secondary-foreground px-4 py-2"
          : null,
        props.message.role === "user" ? "ml-auto" : "mr-auto"
      )}
    >
      {props.message.role !== "user" && (
        <div className="mr-1 bg-secondary border rounded-full    w-10 h-10 flex-shrink-0 flex items-center justify-center">
          {props.aiEmoji}
        </div>
      )}

      <div className="whitespace-pre-wrap rounded-[24px] bg-secondary px-4 py-2 flex flex-col">
        <span>{props.message.content}</span>
      </div>
    </div>
  );
}
