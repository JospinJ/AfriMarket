import { DashboardStubPage } from "@/components/dashboard/DashboardStubPage";

export const metadata = { title: "Gains — Livreur" };

export default function DriverEarningsPage() {
  return (
    <DashboardStubPage
      title="Mes gains"
      description="Revenus hebdomadaires et historique des paiements."
      backHref="/driver"
    />
  );
}
