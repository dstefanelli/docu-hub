import type { Document } from "@/types/document";

export function createDocument(title: string, version: string): Document {
  const now = new Date().toISOString();
  return {
    ID: crypto.randomUUID(),
    Title: title,
    Version: version,
    CreatedAt: now,
    UpdatedAt: now,
    Attachments: [],
    Contributors: [],
  };
}
