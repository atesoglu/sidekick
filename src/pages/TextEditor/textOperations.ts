/**
 * Pure, line-oriented string utilities backing the Text Editor page. Kept
 * framework-free so they're trivial to unit test in isolation.
 */

const splitLines = (text: string) => text.split(/\r?\n/);

export function removeDuplicateLines(text: string): string {
  const seen = new Set<string>();
  return splitLines(text)
    .filter((line) => (seen.has(line) ? false : (seen.add(line), true)))
    .join("\n");
}

export function removeEmptyLines(text: string): string {
  return splitLines(text)
    .filter((line) => line.trim() !== "")
    .join("\n");
}

export function removeLinesContaining(text: string, keyword: string): string {
  if (!keyword) return text;
  return splitLines(text)
    .filter((line) => !line.includes(keyword))
    .join("\n");
}

export function removeLinesNotContaining(
  text: string,
  keyword: string,
): string {
  if (!keyword) return text;
  return splitLines(text)
    .filter((line) => line.includes(keyword))
    .join("\n");
}

export function prefixLines(text: string, prefix: string): string {
  if (!prefix) return text;
  return splitLines(text)
    .map((line) => prefix + line)
    .join("\n");
}

export function suffixLines(text: string, suffix: string): string {
  if (!suffix) return text;
  return splitLines(text)
    .map((line) => line + suffix)
    .join("\n");
}

export function sortLinesAscending(text: string): string {
  return splitLines(text)
    .sort((a, b) => a.localeCompare(b))
    .join("\n");
}

export function sortLinesDescending(text: string): string {
  return splitLines(text)
    .sort((a, b) => b.localeCompare(a))
    .join("\n");
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (word) => word[0].toUpperCase() + word.slice(1).toLowerCase(),
  );
}

export function toSentenceCase(text: string): string {
  return splitLines(text)
    .map((line) => {
      const start = line.search(/\S/);
      if (start === -1) return line;
      return (
        line.slice(0, start) +
        line[start].toUpperCase() +
        line.slice(start + 1).toLowerCase()
      );
    })
    .join("\n");
}

export function joinLines(text: string, separator = " "): string {
  return splitLines(text).join(separator);
}

export type BreakPosition = "before" | "after";

export function breakLines(
  text: string,
  keyword: string,
  position: BreakPosition,
): string {
  if (!keyword) return text;
  const replacement = position === "before" ? `\n${keyword}` : `${keyword}\n`;
  const result = text.split(keyword).join(replacement);
  return position === "before"
    ? result.replace(/^\n/, "")
    : result.replace(/\n$/, "");
}

export function generateSampleLines(count = 10): string {
  return Array.from({ length: count }, (_, i) => `Line ${i + 1}`).join("\n");
}
