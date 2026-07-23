import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(__dirname, "../..");

function read(rel: string) {
  return readFileSync(join(root, rel), "utf8");
}

describe("responsive foundations", () => {
  it("clips horizontal overflow on the document shell", () => {
    const globals = read("app/globals.css");
    const layout = read("app/layout.tsx");
    expect(globals).toMatch(/overflow-x:\s*clip/);
    expect(layout).toMatch(/overflow-x-clip/);
  });

  it("exposes a shared Container with fluid gutters", () => {
    const container = read("components/shared/Container.tsx");
    expect(container).toMatch(/max-w-7xl/);
    expect(container).toMatch(/px-4/);
    expect(container).toMatch(/sm:px-6/);
    expect(container).toMatch(/min-w-0/);
  });

  it("avoids classic 100vw full-bleed breakouts on home hero/ticker", () => {
    const hero = read("components/home/HomeHero.tsx");
    const ticker = read("components/home/DiscoveryTicker.tsx");
    expect(hero).not.toMatch(/100vw-80rem/);
    expect(ticker).not.toMatch(/100vw-80rem/);
    expect(hero).toMatch(/w-full overflow-hidden/);
    expect(ticker).toMatch(/w-full overflow-hidden/);
  });

  it("keeps dialogs viewport-safe on narrow screens", () => {
    const dialog = read("components/ui/dialog.tsx");
    expect(dialog).toMatch(/min\(100%-2rem/);
    expect(dialog).toMatch(/max-h-\[min\(90dvh/);
  });

  it("uses a mobile list/detail pattern for messages", () => {
    const messages = read("app/(dashboard)/messages/page.tsx");
    expect(messages).toMatch(/mobileShowChat/);
    expect(messages).toMatch(/hidden md:flex/);
    expect(messages).toMatch(/100dvh/);
  });

  it("uses 16px inputs on mobile to avoid iOS zoom", () => {
    const input = read("components/ui/input.tsx");
    expect(input).toMatch(/text-base/);
    expect(input).toMatch(/sm:text-sm/);
  });
});
