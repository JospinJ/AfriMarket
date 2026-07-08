import { describe, expect, it } from "vitest";
import { translate } from "@/lib/i18n/translate";
import { frDictionary } from "@/lib/i18n/dictionaries/fr";

describe("translate", () => {
  it("résout une clé imbriquée", () => {
    expect(translate(frDictionary, "nav.orders")).toBe("Mes commandes");
  });

  it("interpole les paramètres", () => {
    expect(
      translate(frDictionary, "notifications.unread", { count: 3 }),
    ).toBe("3 non lues");
  });

  it("retourne la clé si introuvable", () => {
    expect(translate(frDictionary, "missing.key")).toBe("missing.key");
  });
});
