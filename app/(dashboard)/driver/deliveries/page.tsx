import { DashboardStubPage } from "@/components/dashboard/DashboardStubPage";

export const metadata = { title: "Livraisons — Livreur" };

export default function DriverDeliveriesPage() {
  return (
    <DashboardStubPage
      title="Mes livraisons"
      description="Courses en cours et à accepter."
      backHref="/driver"
    />
  );
}
