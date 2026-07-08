"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OnboardingStepper } from "@/components/seller/OnboardingStepper";
import { FormField, SellerFormShell } from "@/components/seller/SellerFormShell";
import { storeCreateSchema, type StoreCreateInput } from "@/lib/validations/seller-onboarding";
import { suggestSlug } from "@/lib/utils/slugify";
import { useRole } from "@/hooks/useRole";
import { useSellerStore } from "@/store/useSellerStore";
import { ROUTES } from "@/lib/constants/routes";
import { IMAGES } from "@/lib/constants/images";

const STEPS = ["Compte", "Boutique", "Produit", "Lancement"];

export function StoreCreateForm() {
  const router = useRouter();
  const { userId } = useRole();
  const createStore = useSellerStore((s) => s.createStore);
  const [errors, setErrors] = useState<Partial<Record<keyof StoreCreateInput, string>>>({});
  const [form, setForm] = useState<StoreCreateInput>({
    storeName: "",
    storeSlug: "",
    description: "",
    specialty: "",
    city: "",
    logoUrl: "",
    bannerUrl: "",
  });
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (!slugTouched && form.storeName.length >= 3) {
      setForm((f) => ({ ...f, storeSlug: suggestSlug(f.storeName) }));
    }
  }, [form.storeName, slugTouched]);

  const update = <K extends keyof StoreCreateInput>(key: K, value: StoreCreateInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = storeCreateSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof StoreCreateInput, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof StoreCreateInput;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    if (!userId) return;
    createStore(userId, parsed.data);
    router.push(ROUTES.sellerOnboardingProduct);
  };

  return (
    <>
      <OnboardingStepper steps={STEPS} current={1} />
      <SellerFormShell
        title="Créer votre boutique"
        description="Nom, identité et spécialité — votre vitrine sera visible sur AfriMarket Hub."
      >
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormField label="Nom de la boutique" error={errors.storeName}>
            <Input
              value={form.storeName}
              onChange={(e) => update("storeName", e.target.value)}
              placeholder="Ex. Mode Wax Douala"
              required
            />
          </FormField>
          <FormField
            label="Adresse web (slug)"
            error={errors.storeSlug}
            hint={`Votre boutique : afrimarket.cm/stores/${form.storeSlug || "votre-boutique"}`}
          >
            <Input
              value={form.storeSlug}
              onChange={(e) => {
                setSlugTouched(true);
                update("storeSlug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
              }}
              required
            />
          </FormField>
          <FormField label="Spécialité" error={errors.specialty}>
            <Input
              value={form.specialty}
              onChange={(e) => update("specialty", e.target.value)}
              placeholder="Ex. Mode wax, smartphones, artisanat…"
              required
            />
          </FormField>
          <FormField label="Description" error={errors.description}>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={4}
              className="flex w-full rounded-lg border border-sand/30 bg-white px-3 py-2 text-sm text-night placeholder:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep"
              placeholder="Présentez votre boutique, vos produits et votre zone de livraison…"
              required
            />
          </FormField>
          <FormField label="Ville principale" error={errors.city}>
            <Input
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              required
            />
          </FormField>
          <FormField
            label="Logo (URL, optionnel)"
            error={errors.logoUrl}
            hint="Laissez vide pour utiliser l'image par défaut"
          >
            <Input
              type="url"
              value={form.logoUrl ?? ""}
              onChange={(e) => update("logoUrl", e.target.value)}
              placeholder={IMAGES.placeholder}
            />
          </FormField>
          <Button type="submit" className="w-full bg-dash-accent text-night hover:bg-dash-accent-hover">
            Continuer — Ajouter mon premier produit
          </Button>
        </form>
      </SellerFormShell>
    </>
  );
}
