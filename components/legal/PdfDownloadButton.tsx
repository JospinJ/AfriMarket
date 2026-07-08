"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PdfDownloadButtonProps {
  documentTitle: string;
}

export function PdfDownloadButton({ documentTitle }: PdfDownloadButtonProps) {
  const handleDownload = () => {
    // TODO API: GET /legal/cgu/pdf → Blob
    void documentTitle;
    alert("Téléchargement PDF (mock) — intégration API à venir");
  };

  return (
    <Button variant="secondary" size="sm" onClick={handleDownload} className="gap-2">
      <Download className="h-4 w-4" aria-hidden />
      Télécharger PDF
    </Button>
  );
}
