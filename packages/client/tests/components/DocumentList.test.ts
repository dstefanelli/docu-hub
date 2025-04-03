import { describe, it, expect, beforeEach } from "vitest";
import { renderDocumentList } from "../../src/components/DocumentList";
import type { Document } from "../../src/types/document";

describe("renderDocumentList", () => {
  let container: HTMLUListElement;

  beforeEach(() => {
    container = document.createElement("ul");
    document.body.appendChild(container);

    const template = document.createElement("template");
    template.id = "template-list";
    template.innerHTML = `
      <div class="card">
        <div class="card-body">
          <div class="list-view-name">
            <h5 class="card-title"></h5>
            <strong class="card-version"></strong>
          </div>
          <div class="list-view-contributors contributors">
            <ul class="contributors-list"></ul>
          </div>
          <div class="list-view-attachments attachments">
            <ul class="attachments-list"></ul>
          </div>
        </div>
      </div>
    `.trim();

    document.body.appendChild(template);
  });

  it("renders a document title and version", () => {
    const docs: Document[] = [
      {
        ID: "123",
        Title: "Doc 1",
        Version: "1.0.0",
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
        Contributors: [],
        Attachments: [],
      },
    ];

    renderDocumentList(container, docs, "template-list");

    expect(container.querySelector(".card-title")?.textContent).toBe("Doc 1");
    expect(container.querySelector(".card-version")?.textContent).toContain(
      "1.0.0"
    );
  });

  it("renders a message when there are no documents", () => {
    renderDocumentList(container, [], "template-list");
    expect(container.textContent).toContain("No documents found.");
  });
});
