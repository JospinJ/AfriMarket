import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { ROUTES } from "@/lib/constants/routes";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen min-w-0 overflow-x-clip bg-ivory bg-motif-bogolan">
      <Navbar />
      <main className="min-h-[60vh] min-w-0">{children}</main>
      <footer className="border-t border-sand/15 bg-white py-6 text-center text-xs text-sand">
        <Link href={ROUTES.legalPrivacy} className="hover:text-primary">
          Paiement sécurisé
        </Link>
        <span className="mx-2">·</span>
        <Link href={ROUTES.help} className="hover:text-primary">
          Aide
        </Link>
      </footer>
    </div>
  );
}
