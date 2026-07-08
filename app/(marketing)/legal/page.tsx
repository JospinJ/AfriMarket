import { LegalDocument } from "@/components/legal/LegalDocument";
import { TableOfContents } from "@/components/legal/TableOfContents";
import { PdfDownloadButton } from "@/components/legal/PdfDownloadButton";
import { mockLegalDocument } from "@/lib/mocks/legal";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-night">
      <div className="mx-auto max-w-5xl px-4 py-12 lg:py-16">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">{mockLegalDocument.title}</h1>
            <p className="mt-2 text-sm text-white/60">
              Dernière mise à jour : {mockLegalDocument.updatedAt}
            </p>
          </div>
          <PdfDownloadButton documentTitle={mockLegalDocument.title} />
        </header>
        <div className="grid gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <TableOfContents sections={mockLegalDocument.sections} />
          </aside>
          <main className="lg:col-span-3">
            <LegalDocument sections={mockLegalDocument.sections} />
          </main>
        </div>
      </div>
    </div>
  );
}
