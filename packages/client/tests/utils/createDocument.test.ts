import { describe, it, expect } from "vitest";
import { createDocument } from "../../src/utils/createDocument";

describe("createDocument", () => {
  const title = "Test Title";
  const version = "1.0.0";

  it("should return a document with title and version", () => {
    const doc = createDocument(title, version);
    expect(doc.Title).toBe(title);
    expect(doc.Version).toBe(version);
  });

  it("should include an ID and it should be a valid UUID", () => {
    const doc = createDocument(title, version);
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(doc.ID).toMatch(uuidRegex);
  });

  it("should initialize empty arrays for attachments and contributors", () => {
    const doc = createDocument(title, version);
    expect(doc.Attachments).toEqual([]);
    expect(doc.Contributors).toEqual([]);
  });

  it("should generate unique IDs on multiple calls", () => {
    const doc1 = createDocument("Doc1", "1.0.0");
    const doc2 = createDocument("Doc2", "1.0.0");
    expect(doc1.ID).not.toBe(doc2.ID);
  });
});
