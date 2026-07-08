import { DashboardStubPage } from "@/components/dashboard/DashboardStubPage";

export const metadata = { title: "Utilisateurs — Admin" };

export default function AdminUsersPage() {
  return (
    <DashboardStubPage
      title="Gestion des utilisateurs"
      description="Liste, rôles et modération des comptes."
      backHref="/admin"
    />
  );
}
