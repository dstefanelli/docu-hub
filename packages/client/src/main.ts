import "./styles/global.css";
import { Document } from "./types/document";
import { fetchDocuments } from "./api/fetchDocuments";
import { renderDocumentList } from "./components/DocumentList";
import { connectToNotifications } from "./realtime/websocket";
import { setupNotificationCounter } from "./components/LiveNotifications";

const documentList = document.querySelector<HTMLDivElement>("#document-list")!;
const notificationCounterEl = document.querySelector<HTMLParagraphElement>(
  "#notification-counter"
)!;
const sortSelect = document.querySelector<HTMLSelectElement>("#sort-select")!;
const toggleBtn =
  document.querySelector<HTMLButtonElement>("#toggle-view-btn")!;
const spanList = toggleBtn.querySelector(".list")!;
const spanGrid = toggleBtn.querySelector(".grid")!;

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
