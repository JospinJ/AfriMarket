import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip bg-ivory bg-motif-bogolan">
      <Navbar />
      <main className="min-w-0 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
