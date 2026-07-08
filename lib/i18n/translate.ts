export type TranslationDictionary = Record<string, unknown>;

export function translate(
  dictionary: TranslationDictionary,
  key: string,
  params?: Record<string, string | number>,
): string {
  const parts = key.split(".");
  let current: unknown = dictionary;

  for (const part of parts) {
    if (!current || typeof current !== "object" || !(part in current)) {
      return key;
    }
    current = (current as Record<string, unknown>)[part];
  }

  if (typeof current !== "string") return key;
  if (!params) return current;

  return Object.entries(params).reduce(
    (text, [paramKey, value]) => text.replaceAll(`{${paramKey}}`, String(value)),
    current,
  );
}
