"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (next !== confirm) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }
    // TODO API: POST /security/password → { current, next } → { success }
    setMessage("Mot de passe mis à jour (mock)");
    setCurrent("");
    setNext("");
    setConfirm("");
  };

  return (
    <section className="rounded-2xl border border-sand/20 bg-white p-6">
      <h2 className="font-display text-lg font-semibold text-night mb-4">Mot de passe</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="pwd-current" className="text-sm text-night">Mot de passe actuel</label>
          <Input id="pwd-current" type="password" value={current} onChange={(e) => setCurrent(e.target.value)} className="mt-1" />
        </div>
        <div>
          <label htmlFor="pwd-next" className="text-sm text-night">Nouveau mot de passe</label>
          <Input id="pwd-next" type="password" value={next} onChange={(e) => setNext(e.target.value)} className="mt-1" />
        </div>
        <div>
          <label htmlFor="pwd-confirm" className="text-sm text-night">Confirmer</label>
          <Input id="pwd-confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1" />
        </div>
        {message && <p className="text-sm text-green-deep">{message}</p>}
        <Button type="submit">Mettre à jour</Button>
      </form>
    </section>
  );
}
