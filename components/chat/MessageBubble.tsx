import { Mic } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Message } from "@/types/chat";

export interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const time = new Date(message.createdAt).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
          isOwn ? "bg-green-deep text-white rounded-br-md" : "bg-white border border-sand/20 text-night rounded-bl-md"
        )}
      >
        {!isOwn && (
          <p className="mb-1 text-xs font-medium text-gold">{message.authorName}</p>
        )}
        {message.type === "voice" ? (
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4" aria-hidden />
            <span>Message vocal</span>
          </div>
        ) : (
          <p>{message.content}</p>
        )}
        <p className={cn("mt-1 text-[10px]", isOwn ? "text-white/60" : "text-sand")}>{time}</p>
      </div>
    </div>
  );
}
