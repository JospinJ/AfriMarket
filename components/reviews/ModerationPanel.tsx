"use client";

import { RoleGuard } from "@/components/shared/RoleGuard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/button";
import type { Review } from "@/types/review";

export interface ModerationPanelProps {
  reviews: Review[];
}

export function ModerationPanel({ reviews }: ModerationPanelProps) {
  const handleModerate = (reviewId: string, action: "approve" | "remove") => {
    // TODO API: PATCH /reviews/:id/moderate → { action } → { success }
    void reviewId;
    void action;
  };

  return (
    <RoleGuard allow={["admin"]} fallback={null}>
      <section className="rounded-lg border border-terracotta/30 bg-terracotta/5 p-4">
        <h3 className="font-display font-semibold text-night">Modération ({reviews.length})</h3>
        <div className="mt-4 space-y-4">
          {reviews.length === 0 ? (
            <p className="text-sm text-sand">Aucun avis signalé</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="space-y-2">
                <ReviewCard review={r} />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleModerate(r.id, "approve")}>
                    Approuver
                  </Button>
                  <Button size="sm" variant="outline" className="text-terracotta" onClick={() => handleModerate(r.id, "remove")}>
                    Supprimer
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </RoleGuard>
  );
}
