"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { FooterLink } from "@/lib/constants/footer-nav";
import { cn } from "@/lib/utils/cn";

interface FooterNavColumnProps {
  title: string;
  links: FooterLink[];
  className?: string;
}

export function FooterNavColumn({ title, links, className }: FooterNavColumnProps) {
  return (
    <nav className={cn("min-w-0", className)} aria-label={title}>
      <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-gold">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-white md:min-h-0"
            >
              <span className="relative">
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full"
                  aria-hidden
                />
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 shrink-0 translate-y-px opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface FooterNavAccordionSectionProps {
  title: string;
  links: FooterLink[];
  defaultOpen?: boolean;
}

export function FooterNavAccordionSection({
  title,
  links,
  defaultOpen = false,
}: FooterNavAccordionSectionProps) {
  return (
    <details
      className="group border-b border-white/10 py-1 md:hidden"
      open={defaultOpen}
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between py-3 text-sm font-semibold text-white marker:content-none [&::-webkit-details-marker]:hidden">
        {title}
        <motion.span
          className="text-gold transition-transform duration-300 group-open:rotate-45"
          aria-hidden
        >
          +
        </motion.span>
      </summary>
      <ul className="space-y-2 pb-4 pl-1">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="block min-h-11 py-2 text-sm text-white/75 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
