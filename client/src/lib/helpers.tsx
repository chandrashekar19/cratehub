import type { ReactNode } from "react"

export function renderIf(condition: boolean, render: () => ReactNode): ReactNode {
  return condition ? render() : null
}

//  Truncate text with ellipsis
export function truncate(text: string, length = 0): string {
  if (!text) return ""
  return text.length > length ? `${text.slice(0, length)}...` : text
}

//  Duplicate object (safe shallow clone)
export function clone<T extends object>(obj: T): T {
  return { ...obj }
}

//  Convert null/undefined to empty string
export function toStringSafe(value: unknown): string {
  return value == null ? "" : String(value)
}

// Convert null/undefined to zero
export function toNumberSafe(value: unknown): number {
  return value == null ? 0 : Number(value)
}

// pluralize based on count
export function pluralize(count: number, suffix = "s"): string {
  return count === 1 ? "" : suffix
}

// Check if object is empty
export function isEmptyObject(obj: unknown): boolean {
  return typeof obj === "object" && obj != null && Object.keys(obj).length === 0
}

//  Safe slug generator
export function slug(text: string): string {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")   // spaces & underscores -> hyphens
    .replace(/[^\w-]+/g, "")   // remove non-word
    .replace(/--+/g, "-")      // collapse multiple hyphens
    .replace(/^-+|-+$/g, "");  // trim hyphens at ends
}
