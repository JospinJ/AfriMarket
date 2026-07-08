import { describe, expect, it } from "vitest";
import {
  getDescendantCategoryIds,
  productMatchesCategory,
} from "@/lib/utils/category";

describe("category filtering", () => {
  it("resolves parent category to all child ids", () => {
    expect(getDescendantCategoryIds("fashion")).toEqual(["men", "women", "kids"]);
    expect(getDescendantCategoryIds("electronics")).toEqual([
      "phones",
      "tablets",
      "computers",
      "accessories",
    ]);
  });

  it("resolves child category to itself", () => {
    expect(getDescendantCategoryIds("phones")).toEqual(["phones"]);
    expect(getDescendantCategoryIds("moto")).toEqual(["moto"]);
  });

  it("matches products under parent categories", () => {
    expect(productMatchesCategory("women", "fashion")).toBe(true);
    expect(productMatchesCategory("phones", "electronics")).toBe(true);
    expect(productMatchesCategory("books", "culture")).toBe(true);
  });

  it("matches agriculture without automobile products", () => {
    expect(productMatchesCategory("seeds", "agri")).toBe(true);
    expect(productMatchesCategory("agri-tools", "agri")).toBe(true);
    expect(productMatchesCategory("parts", "agri")).toBe(false);
    expect(productMatchesCategory("moto", "agri")).toBe(false);
  });

  it("resolves agri-tools child slug", () => {
    expect(getDescendantCategoryIds("agri-tools")).toEqual(["agri-tools"]);
  });
});
