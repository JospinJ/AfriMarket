import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface LegalSection {
  id: string;
  title: string;
  content: string;
}

export interface LegalDocumentProps {
  sections: LegalSection[];
}

export function LegalDocument({ sections }: LegalDocumentProps) {
  return (
    <Accordion type="multiple" defaultValue={[sections[0]?.id ?? ""]} className="rounded-2xl bg-night/50 p-4">
      {sections.map((section) => (
        <AccordionItem key={section.id} value={section.id} id={section.id}>
          <AccordionTrigger>{section.title}</AccordionTrigger>
          <AccordionContent>
            <p className="leading-relaxed">{section.content}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
