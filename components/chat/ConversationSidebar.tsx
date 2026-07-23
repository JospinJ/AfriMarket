"use client";

import { cn } from "@/lib/utils/cn";
import type { Conversation } from "@/types/chat";

export interface ConversationSidebarProps {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ConversationSidebar({ conversations, selectedId, onSelect }: ConversationSidebarProps) {
  return (
    <aside className="flex h-full w-full min-w-0 flex-col overflow-y-auto">
      <div className="border-b border-sand/20 p-4">
        <h2 className="font-display font-semibold text-night">Messages</h2>
      </div>
      <ul>
        {conversations.map((conv) => (
          <li key={conv.id}>
            <button
              type="button"
              onClick={() => onSelect(conv.id)}
              className={cn(
                "w-full px-4 py-3 text-left transition-colors hover:bg-surface-light min-h-[44px]",
                selectedId === conv.id && "bg-green-deep/5 border-l-2 border-green-deep"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-night">{conv.participantName}</span>
                {conv.unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1.5 text-[10px] font-bold text-white">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
              {conv.contextLabel && (
                <p className="mt-0.5 text-xs text-gold">{conv.contextLabel}</p>
              )}
              {conv.lastMessage && (
                <p className="mt-1 truncate text-xs text-sand">{conv.lastMessage}</p>
              )}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
