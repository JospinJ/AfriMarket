import { SellerRegisterForm } from "@/components/seller/SellerRegisterForm";

export const metadata = { title: "Inscription vendeur — AfriMarket Hub" };

export default function RegisterSellerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <SellerRegisterForm />
    </div>
  );
}
