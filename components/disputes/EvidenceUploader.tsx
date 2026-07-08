"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface EvidenceUploaderProps {
  disputeId: string;
}

export function EvidenceUploader({ disputeId }: EvidenceUploaderProps) {
  const [files, setFiles] = useState<string[]>([]);

  const handleUpload = () => {
    // TODO API: POST /disputes/:id/evidence → FormData → { url, kind }
    setFiles((prev) => [...prev, `evidence-${prev.length + 1}.jpg`]);
    void disputeId;
  };

  return (
    <section className="rounded-lg border border-dashed border-sand/40 p-4">
      <h3 className="text-sm font-semibold text-night mb-2">Ajouter une preuve</h3>
      <p className="text-xs text-sand mb-3">Images, vidéos, documents ou message vocal</p>
      <Button type="button" variant="outline" size="sm" onClick={handleUpload} className="gap-2">
        <Upload className="h-4 w-4" aria-hidden />
        Téléverser
      </Button>
      {files.length > 0 && (
        <ul className="mt-2 text-xs text-sand">
          {files.map((f) => (
            <li key={f}>{f} (mock)</li>
          ))}
        </ul>
      )}
    </section>
  );
}
