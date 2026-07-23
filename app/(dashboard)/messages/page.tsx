"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ConversationSidebar } from "@/components/chat/ConversationSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ContextPanel } from "@/components/chat/ContextPanel";
import { mockConversations } from "@/lib/mocks/chat";
import { cn } from "@/lib/utils/cn";

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState(mockConversations[0]?.id ?? "");
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const selected = mockConversations.find((c) => c.id === selectedId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMobileShowChat(true);
  };

  return (
    <div
      className={cn(
        "flex min-h-[min(70dvh,560px)] overflow-hidden rounded-2xl border border-sand/20 bg-white",
        "h-[calc(100dvh-8.5rem)] md:h-[calc(100dvh-7rem)]",
      )}
    >
      <div
        className={cn(
          "min-w-0 shrink-0 border-r border-sand/20 md:flex md:w-72 md:max-w-xs",
          mobileShowChat ? "hidden md:flex" : "flex w-full md:w-72",
        )}
      >
        <ConversationSidebar
          conversations={mockConversations}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </div>

      <div
        className={cn(
          "min-w-0 flex-1",
          mobileShowChat ? "flex" : "hidden md:flex",
        )}
      >
        {selected ? (
          <div className="flex min-w-0 flex-1 flex-col">
            <button
              type="button"
              onClick={() => setMobileShowChat(false)}
              className="flex min-h-11 items-center gap-2 border-b border-sand/20 px-3 text-sm font-medium text-night md:hidden"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              Conversations
            </button>
            <div className="flex min-h-0 min-w-0 flex-1">
              <ChatWindow conversation={selected} />
              <ContextPanel conversation={selected} />
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center p-4 text-center text-sand">
            Sélectionnez une conversation
          </div>
        )}
      </div>
    </div>
  );
}
