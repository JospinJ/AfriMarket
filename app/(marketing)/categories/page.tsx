import Link from "next/link";
import { CATEGORIES } from "@/lib/constants/categories";
import { ROUTES } from "@/lib/constants/routes";

export const metadata = { title: "Catégories — AfriMarket Hub" };

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-night md:text-3xl">Catégories</h1>
      <p className="mt-2 text-sand">Parcourez toutes les catégories de la marketplace.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <section key={cat.id} className="rounded-2xl border bg-white p-5 shadow-sm">
            <Link
              href={ROUTES.category(cat.slug)}
              className="font-display text-lg font-semibold text-green-deep hover:underline"
            >
              {cat.name}
            </Link>
            <ul className="mt-3 space-y-1">
              {(cat.children ?? []).map((child) => (
                <li key={child.id}>
                  <Link
                    href={ROUTES.category(child.slug)}
                    className="text-sm text-night hover:text-green-deep"
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
