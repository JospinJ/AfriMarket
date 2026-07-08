"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    // TODO API: POST /newsletter → { email } → { subscribed: boolean }
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-white">Newsletter</p>
      <p className="text-xs text-white/70">Offres exclusives et nouveautés</p>
      <div className="flex gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
          required
          disabled={status === "loading"}
        />
        <Button
          type="submit"
          variant="secondary"
          size="sm"
          disabled={status === "loading"}
        >
          {status === "loading" ? "…" : "S'inscrire"}
        </Button>
      </div>
      {status === "success" && (
        <p className="text-xs text-green-400">Inscription réussie !</p>
      )}
      {status === "error" && (
        <p className="text-xs text-terracotta">Erreur, réessayez.</p>
      )}
    </form>
  );
}
