import { DashboardStubPage } from "@/components/dashboard/DashboardStubPage";

export const metadata = { title: "Commandes — Vendeur" };

export default function SellerOrdersPage() {
  return (
    <DashboardStubPage
      title="Commandes vendeur"
      description="Suivi des commandes et expéditions."
      backHref="/seller"
    />
  );
}
