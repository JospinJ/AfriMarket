"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OnboardingStepper } from "@/components/seller/OnboardingStepper";
import { FormField, SellerFormShell } from "@/components/seller/SellerFormShell";
import { sellerRegisterSchema, type SellerRegisterInput } from "@/lib/validations/seller-onboarding";
import { useRoleStore } from "@/store/useRoleStore";
import { useSellerStore } from "@/store/useSellerStore";
import { ROUTES } from "@/lib/constants/routes";

const STEPS = ["Compte", "Boutique", "Produit", "Lancement"];

export function SellerRegisterForm() {
  const router = useRouter();
  const registerSeller = useRoleStore((s) => s.registerSeller);
  const [errors, setErrors] = useState<Partial<Record<keyof SellerRegisterInput, string>>>({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    acceptTerms: false,
  });

  const update = <K extends keyof SellerRegisterInput>(key: K, value: SellerRegisterInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = sellerRegisterSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof SellerRegisterInput, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof SellerRegisterInput;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    registerSeller(parsed.data);
    useSellerStore.setState({ onboardingStep: "store" });
    router.push(ROUTES.sellerOnboarding);
  };

  return (
    <>
      <OnboardingStepper steps={STEPS} current={0} />
      <SellerFormShell
        variant="marketing"
        title="Créer votre compte vendeur"
        description="Rejoignez AfriMarket Hub — Express, Import et Gros. Mobile Money intégré, 0 FCFA d'ouverture."
      >
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Prénom" error={errors.firstName}>
              <Input
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                autoComplete="given-name"
                required
              />
            </FormField>
            <FormField label="Nom" error={errors.lastName}>
              <Input
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                autoComplete="family-name"
                required
              />
            </FormField>
          </div>
          <FormField label="Téléphone (Mobile Money)" error={errors.phone} hint="Ex. 677 12 34 56">
            <Input
              type="tel"
              inputMode="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              autoComplete="tel"
              required
            />
          </FormField>
          <FormField label="E-mail (optionnel)" error={errors.email}>
            <Input
              type="email"
              value={form.email ?? ""}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
            />
          </FormField>
          <FormField label="Ville" error={errors.city}>
            <Input
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="Douala, Yaoundé…"
              required
            />
          </FormField>
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-sand/20 bg-surface-light p-3">
            <input
              type="checkbox"
              checked={form.acceptTerms === true}
              onChange={(e) => update("acceptTerms", (e.target.checked ? true : false) as true)}
              className="mt-1 h-4 w-4 rounded border-sand/40 text-green-deep focus:ring-green-deep"
            />
            <span className="text-sm text-sand">
              J&apos;accepte les{" "}
              <Link href={ROUTES.legalTerms} className="text-primary hover:underline">
                conditions vendeur
              </Link>{" "}
              et la politique de confidentialité.
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-xs text-terracotta" role="alert">
              {errors.acceptTerms}
            </p>
          )}
          <Button type="submit" className="w-full bg-green-deep text-white hover:bg-green-forest">
            Continuer — Créer ma boutique
          </Button>
          <p className="text-center text-sm text-sand">
            Déjà vendeur ?{" "}
            <Link href={`${ROUTES.login}?next=${ROUTES.sellerOnboarding}`} className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </form>
      </SellerFormShell>
    </>
  );
}
