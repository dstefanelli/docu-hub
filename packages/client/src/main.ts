import "./styles/global.scss";
import { setDocuments, getDocuments } from "./services/documents";
import { fetchDocuments } from "./services/fetchDocuments";
import { renderDocumentList } from "./components/DocumentList";
import { connectToNotifications } from "./realtime/notificationSocket";
import { setupNotificationCounter } from "./components/NotificationCounter";
import { initializeForm } from "./form";

let currentView: "list" | "grid" = "list";
let sortValue: string = "";

// Elements
const documentList = document.querySelector<HTMLDivElement>("#document-list")!;
const notificationCounterEl = document.querySelector<HTMLParagraphElement>(
  "#notification-counter"
)!;
const sortSelect = document.querySelector<HTMLSelectElement>("#sort-select")!;
const toggleBtn = document.getElementById("toggle-view-btn")!;
const spanList = toggleBtn.querySelector(".list")!;
const spanGrid = toggleBtn.querySelector(".grid")!;

// Sorting
sortSelect.addEventListener("change", (e) => {
  const value = (e.target as HTMLSelectElement).value;
  sortDocuments(value);
  sortValue = value;
});

// Toggle
toggleBtn.addEventListener("click", () => {
  currentView = currentView === "list" ? "grid" : "list";

  document.body.classList = currentView === "grid" ? "grid-mode" : "list-mode";
  documentList.className = currentView === "grid" ? "grid-view" : "list-view";
  spanList.classList.toggle("active", currentView === "list");
  spanGrid.classList.toggle("active", currentView === "grid");
  updateViewToggleUI();
  sortDocuments(sortSelect.value);
});

function sortDocuments(criteria: string) {
  const docs = getDocuments();
  const sorted = [...docs];

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

function updateViewToggleUI() {
  const isGrid = currentView === "grid";

  spanList.classList.toggle("active", !isGrid);
  spanGrid.classList.toggle("active", isGrid);

  toggleBtn.setAttribute(
    "aria-label",
    isGrid ? "Switch to grid view" : "Switch to list view"
  );
}

async function init() {
  try {
    const docs = await fetchDocuments();
    setDocuments(docs);
    sortDocuments(sortSelect.value);
  } catch (err) {
    documentList.textContent = "Error loading documents";
    console.error(err);
  }

  const counter = setupNotificationCounter(notificationCounterEl);
  connectToNotifications(() => {
    counter.increment();
  });

  initializeForm(sortValue, sortDocuments);
}

init();
