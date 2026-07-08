import { describe, it, expect } from "vitest";
import { formatFCFA } from "@/lib/utils/format-fcfa";
import { assertThreeOffers } from "@/lib/utils/assert-three-offers";
import { mockProducts } from "@/lib/mocks/products";
import { validatePhone } from "@/lib/utils/validate-phone";

describe("formatFCFA", () => {
  it("formats amount with non-breaking space separator", () => {
    expect(formatFCFA(1250000)).toContain("FCFA");
    expect(formatFCFA(1250000)).toMatch(/1[\s\u00A0]250[\s\u00A0]000/);
  });
});

describe("assertThreeOffers", () => {
  it("passes for valid mock products", () => {
    for (const product of mockProducts) {
      expect(() => assertThreeOffers(product)).not.toThrow();
    }
  });

  it("fails when offers count is not 3", () => {
    const invalid = {
      ...mockProducts[0]!,
      offers: mockProducts[0]!.offers.slice(0, 2),
    };
    expect(() => assertThreeOffers(invalid)).toThrow();
  });
});

describe("validatePhone", () => {
  it("validates Cameroon phone numbers", () => {
    expect(validatePhone("677123456", "CM")).toBe(true);
    expect(validatePhone("123", "CM")).toBe(false);
  });
});

describe("Product invariant", () => {
  it("every mock product has exactly 3 offers with all modes", () => {
    expect(mockProducts.length).toBeGreaterThanOrEqual(12);
    for (const p of mockProducts) {
      expect(p.offers).toHaveLength(3);
      expect(p.offers.map((o) => o.mode).sort()).toEqual(["express", "gros", "import"]);
      const gros = p.offers.find((o) => o.mode === "gros");
      expect(gros?.moq).toBeDefined();
    }
  });
});
