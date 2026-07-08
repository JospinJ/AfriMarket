"use client";

import { useState } from "react";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { ChatInputBar } from "@/components/chat/ChatInputBar";
import { mockMessages } from "@/lib/mocks/chat";
import { useRole } from "@/hooks/useRole";
import type { Conversation } from "@/types/chat";

export interface ChatWindowProps {
  conversation: Conversation;
}

export function ChatWindow({ conversation }: ChatWindowProps) {
  const { userId } = useRole();
  const [messages, setMessages] = useState(mockMessages[conversation.id] ?? []);

  const handleSend = (content: string, type: "text" | "voice" = "text") => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      conversationId: conversation.id,
      authorId: userId,
      authorRole: "buyer" as const,
      authorName: "Moi",
      type,
      content,
      status: "sent" as const,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
    // TODO API: POST /conversations/:id/messages → { type, content } → Message
  };

  return (
    <div className="flex flex-1 flex-col min-w-0">
      <header className="border-b border-sand/20 px-4 py-3">
        <h3 className="font-display font-semibold text-night">{conversation.participantName}</h3>
        {conversation.contextLabel && (
          <p className="text-xs text-sand">{conversation.contextLabel}</p>
        )}
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isOwn={msg.authorId === userId} />
        ))}
      </div>
      <ChatInputBar onSend={handleSend} />
    </div>
  );
}
