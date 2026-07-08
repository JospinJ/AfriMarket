import { z } from "zod";

const phoneCm = z
  .string()
  .min(9, "Numéro invalide (9 chiffres minimum)")
  .max(15, "Numéro trop long")
  .regex(/^[0-9+\s-]+$/, "Caractères invalides");

export const sellerRegisterSchema = z.object({
  firstName: z.string().min(2, "Prénom requis").max(40),
  lastName: z.string().min(2, "Nom requis").max(40),
  phone: phoneCm,
  email: z.string().email("E-mail invalide").optional().or(z.literal("")),
  city: z.string().min(2, "Ville requise").max(60),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les conditions" }),
  }),
});

export type SellerRegisterInput = z.infer<typeof sellerRegisterSchema>;

export const storeCreateSchema = z.object({
  storeName: z.string().min(3, "Nom trop court").max(80),
  storeSlug: z
    .string()
    .min(3, "Slug trop court")
    .max(64)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalide (a-z, 0-9, tirets)"),
  description: z.string().min(20, "Description trop courte (20 car. min)").max(600),
  specialty: z.string().min(2, "Spécialité requise").max(80),
  city: z.string().min(2, "Ville requise").max(60),
  logoUrl: z.string().url("URL invalide").optional().or(z.literal("")),
  bannerUrl: z.string().url("URL invalide").optional().or(z.literal("")),
});

export type StoreCreateInput = z.infer<typeof storeCreateSchema>;

export const productCreateSchema = z
  .object({
    title: z.string().min(3, "Titre requis").max(120),
    brand: z.string().max(60).optional().or(z.literal("")),
    categoryId: z.string().min(1, "Catégorie requise"),
    imageUrl: z.string().url("URL image invalide").min(1, "Image requise"),
    expressPrice: z.coerce.number().int().positive("Prix Express requis"),
    importPrice: z.coerce.number().int().positive("Prix Import requis"),
    grosPrice: z.coerce.number().int().positive("Prix Gros requis"),
    grosMoq: z.coerce.number().int().min(2, "MOQ minimum 2"),
    expressStock: z.coerce.number().int().min(0).default(10),
    importStock: z.coerce.number().int().min(0).default(50),
    grosStock: z.coerce.number().int().min(0).default(100),
  })
  .refine((d) => d.expressPrice >= d.importPrice, {
    message: "Express doit être ≥ Import (triptyque)",
    path: ["expressPrice"],
  })
  .refine((d) => d.importPrice >= d.grosPrice, {
    message: "Import doit être ≥ Gros (triptyque)",
    path: ["importPrice"],
  });

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
