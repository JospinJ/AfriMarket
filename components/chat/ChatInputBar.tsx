"use client";

import { useState } from "react";
import { Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface ChatInputBarProps {
  onSend: (content: string, type?: "text" | "voice") => void;
}

export function ChatInputBar({ onSend }: ChatInputBarProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim(), "text");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-w-0 gap-2 border-t border-sand/20 p-3">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="shrink-0"
        aria-label="Enregistrer un message vocal"
        onClick={() => onSend("[Message vocal — mock]", "voice")}
      >
        <Mic className="h-4 w-4" />
      </Button>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écrire un message…"
        className="min-w-0 flex-1"
        aria-label="Message"
      />
      <Button type="submit" size="icon" className="shrink-0" aria-label="Envoyer">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
