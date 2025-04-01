import "./styles/global.css";
import { Document } from "./types/document";
import { fetchDocuments } from "./api/fetchDocuments";
import { renderDocumentList } from "./components/DocumentList";
import { connectToNotifications } from "./realtime/websocket";
import { setupNotificationCounter } from "./components/LiveNotifications";
import { createDocument } from "./utils/createDocument";

// Documents and Notifications
const documentList = document.querySelector<HTMLDivElement>("#document-list")!;
const notificationCounterEl = document.querySelector<HTMLParagraphElement>(
  "#notification-counter"
)!;

// Sort
const sortSelect = document.querySelector<HTMLSelectElement>("#sort-select")!;

// Toggle List / Grid
const toggleBtn =
  document.querySelector<HTMLButtonElement>("#toggle-view-btn")!;
const spanList = toggleBtn.querySelector(".list")!;
const spanGrid = toggleBtn.querySelector(".grid")!;

// Form
const showFormBtn = document.getElementById("show-form-btn")!;
const form = document.getElementById("new-doc-form") as HTMLFormElement;
const titleInput = document.querySelector<HTMLInputElement>("#doc-title")!;
const versionInput = document.querySelector<HTMLInputElement>("#doc-version")!;
const contributorsInput =
  document.querySelector<HTMLInputElement>("#doc-contributors")!;
const attachmentsInput =
  document.querySelector<HTMLInputElement>("#doc-attachments")!;

let currentView: "list" | "grid" = "list";
let documents: Document[] = [];

function updateViewToggleUI() {
  const isGrid = currentView === "grid";

  spanList.classList.toggle("active", !isGrid);
  spanGrid.classList.toggle("active", isGrid);

  toggleBtn.setAttribute(
    "aria-label",
    isGrid ? "Switch to grid view" : "Switch to list view"
  );
}

toggleBtn.addEventListener("click", () => {
  currentView = currentView === "list" ? "grid" : "list";
  document.body.className = currentView === "grid" ? "grid-mode" : "list-mode";
  documentList.className = currentView === "grid" ? "grid-view" : "list-view";
  updateViewToggleUI();
  sortDocuments(sortSelect.value);
});

function sortDocuments(criteria: string) {
  const sorted = [...documents];

  switch (criteria) {
    case "title":
      sorted.sort((a, b) => a.Title.localeCompare(b.Title));
      break;
    case "version":
      sorted.sort((a, b) => b.Version.localeCompare(a.Version));
      break;
    case "created":
      sorted.sort(
        (a, b) =>
          new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
      );
      break;
  }

  const templateId = currentView === "list" ? "template-list" : "template-grid";
  renderDocumentList(documentList, sorted, templateId);
}

sortSelect.addEventListener("change", (e) => {
  const value = (e.target as HTMLSelectElement).value;
  sortDocuments(value);
});

showFormBtn.addEventListener("click", () => {
  form.classList.remove("d-none");
  showFormBtn.classList.add("d-none");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const version = versionInput.value.trim();
  const contributorsRaw = contributorsInput.value.trim();
  const attachmentsRaw = attachmentsInput.value.trim();
  if (!title || !version) return;

  const contributors = contributorsRaw
    ? contributorsRaw.split(",").map((name) => ({
        ID: crypto.randomUUID(),
        Name: name.trim(),
      }))
    : [];

  const attachments = attachmentsRaw
    ? attachmentsRaw.split(",").map((att) => att.trim())
    : [];

  const newDoc = {
    ...createDocument(title, version),
    Contributors: contributors,
    Attachments: attachments,
  };
  documents.unshift(newDoc);
  sortDocuments(sortSelect.value); // renderizar con el orden actual

  form.reset();
  form.classList.add("d-none");
  showFormBtn.classList.remove("d-none");
});

async function init() {
  try {
    documents = await fetchDocuments();
    sortDocuments(sortSelect.value);
  } catch (err) {
    documentList.textContent = "Error loading documents";
    console.error(err);
  }

  const counter = setupNotificationCounter(notificationCounterEl);

  connectToNotifications(() => {
    counter.increment();
  });
}

init();
