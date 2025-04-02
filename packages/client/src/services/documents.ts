import type { Document } from "../types/document";

let documents: Document[] = [];

export function setDocuments(newDocs: Document[]) {
  documents = [...newDocs];
}

export function getDocuments(): Document[] {
  return [...documents];
}

export function addDocument(doc: Document) {
  documents.unshift(doc);
}

export function clearDocuments() {
  documents = [];
}
