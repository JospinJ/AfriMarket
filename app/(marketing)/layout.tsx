import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-ivory bg-motif-bogolan">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
