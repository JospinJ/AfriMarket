"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PurchaseModeChip } from "@/components/shared/PurchaseModeChip";
import { OnboardingStepper } from "@/components/seller/OnboardingStepper";
import { FormField, SellerFormShell } from "@/components/seller/SellerFormShell";
import { productCreateSchema, type ProductCreateInput } from "@/lib/validations/seller-onboarding";
import { CATEGORIES } from "@/lib/constants/categories";
import { useSellerStore } from "@/store/useSellerStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useToastStore } from "@/store/useToastStore";
import { ROUTES } from "@/lib/constants/routes";
import { IMAGES } from "@/lib/constants/images";

const STEPS = ["Compte", "Boutique", "Produit", "Lancement"];

const FLAT_CATEGORIES = CATEGORIES.flatMap((c) => c.children ?? [{ id: c.id, name: c.name }]);

export function ProductCreateForm({ onboarding = false }: { onboarding?: boolean }) {
  const router = useRouter();
  const store = useSellerStore((s) => s.store);
  const addProduct = useSellerStore((s) => s.addProduct);
  const completeOnboarding = useSellerStore((s) => s.completeOnboarding);
  const pushNotification = useNotificationStore((s) => s.addNotification);
  const pushToast = useToastStore((s) => s.push);

  const [errors, setErrors] = useState<Partial<Record<keyof ProductCreateInput, string>>>({});
  const [form, setForm] = useState<ProductCreateInput>({
    title: "",
    brand: "",
    categoryId: FLAT_CATEGORIES[0]?.id ?? "phones",
    imageUrl: IMAGES.products.dress1,
    expressPrice: 0,
    importPrice: 0,
    grosPrice: 0,
    grosMoq: 5,
    expressStock: 10,
    importStock: 50,
    grosStock: 100,
  });

  const update = <K extends keyof ProductCreateInput>(key: K, value: ProductCreateInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!store) return;
    const parsed = productCreateSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ProductCreateInput, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ProductCreateInput;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    const product = addProduct(store.id, parsed.data);
    pushNotification({
      type: "seller_product_added",
      category: "product",
      titleKey: "notifications.events.seller_product_added.title",
      messageKey: "notifications.events.seller_product_added.message",
      params: { product: product.title },
      href: ROUTES.sellerProducts,
      targetRole: "seller",
    });
    pushToast({
      title: "Produit soumis",
      message: `${product.title} est en attente de validation.`,
      href: ROUTES.sellerProducts,
    });
    if (onboarding) {
      completeOnboarding();
      router.push(ROUTES.seller);
    } else {
      router.push(ROUTES.sellerProducts);
    }
  };

  if (!store) return null;

  return (
    <>
      {onboarding && <OnboardingStepper steps={STEPS} current={2} />}
      <SellerFormShell
        title={onboarding ? "Ajoutez votre premier produit" : "Nouveau produit"}
        description="Triptyque obligatoire : Express ⚡ · Import 🌍 · Gros 🏭 — chaque mode a son prix."
      >
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="flex flex-wrap gap-2">
            <PurchaseModeChip mode="express" />
            <PurchaseModeChip mode="import" />
            <PurchaseModeChip mode="gros" />
          </div>

          <FormField label="Titre du produit" error={errors.title}>
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Ex. Robe wax premium"
              required
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Marque (optionnel)" error={errors.brand}>
              <Input value={form.brand ?? ""} onChange={(e) => update("brand", e.target.value)} />
            </FormField>
            <FormField label="Catégorie" error={errors.categoryId}>
              <select
                value={form.categoryId}
                onChange={(e) => update("categoryId", e.target.value)}
                className="flex h-11 w-full rounded-lg border border-sand/30 bg-white px-3 text-sm text-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep"
              >
                {FLAT_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
          <FormField label="Image (URL)" error={errors.imageUrl}>
            <Input
              type="url"
              value={form.imageUrl}
              onChange={(e) => update("imageUrl", e.target.value)}
              required
            />
          </FormField>

          <div className="rounded-xl border border-sand/15 bg-surface-light p-4">
            <p className="mb-3 text-sm font-semibold text-night">Prix par mode (FCFA)</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <FormField label="⚡ Express" error={errors.expressPrice}>
                <Input
                  type="number"
                  min={1}
                  value={form.expressPrice || ""}
                  onChange={(e) => update("expressPrice", Number(e.target.value))}
                  required
                />
              </FormField>
              <FormField label="🌍 Import" error={errors.importPrice}>
                <Input
                  type="number"
                  min={1}
                  value={form.importPrice || ""}
                  onChange={(e) => update("importPrice", Number(e.target.value))}
                  required
                />
              </FormField>
              <FormField label="🏭 Gros" error={errors.grosPrice}>
                <Input
                  type="number"
                  min={1}
                  value={form.grosPrice || ""}
                  onChange={(e) => update("grosPrice", Number(e.target.value))}
                  required
                />
              </FormField>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <FormField label="MOQ (Gros)" error={errors.grosMoq}>
                <Input
                  type="number"
                  min={2}
                  value={form.grosMoq}
                  onChange={(e) => update("grosMoq", Number(e.target.value))}
                  required
                />
              </FormField>
            </div>
          </div>

          <Button type="submit" className="w-full bg-dash-accent text-night hover:bg-dash-accent-hover">
            {onboarding ? "Publier et accéder à mon espace vendeur" : "Enregistrer le produit"}
          </Button>
          {!onboarding && (
            <Button asChild variant="outline" className="w-full border-dash-border">
              <Link href={ROUTES.sellerProducts}>Annuler</Link>
            </Button>
          )}
        </form>
      </SellerFormShell>
    </>
  );
}
