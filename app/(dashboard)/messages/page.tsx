"use client";

import { ConversationSidebar } from "@/components/chat/ConversationSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ContextPanel } from "@/components/chat/ContextPanel";
import { mockConversations } from "@/lib/mocks/chat";
import { useState } from "react";

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState(mockConversations[0]?.id ?? "");

  const selected = mockConversations.find((c) => c.id === selectedId);

  return (
    <div className="flex h-[calc(100vh-7rem)] overflow-hidden rounded-2xl border border-sand/20 bg-white">
      <ConversationSidebar
        conversations={mockConversations}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <div className="flex flex-1 min-w-0">
        {selected ? (
          <>
            <ChatWindow conversation={selected} />
            <ContextPanel conversation={selected} />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sand">
            Sélectionnez une conversation
          </div>
        )}
      </div>
    </div>
  );
}
