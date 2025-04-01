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

let documents: Document[] = [];

function sortDocuments(criteria: string) {
  const sorted = [...documents]; // clone to avoid mutating original

  switch (criteria) {
    case "title":
      sorted.sort((a, b) => a.Title.localeCompare(b.Title));
      break;
    case "version":
      sorted.sort((a, b) => b.Version.localeCompare(a.Version)); // string version
      break;
    case "created":
      sorted.sort(
        (a, b) =>
          new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
      );
      break;
  }

  renderDocumentList(documentList, sorted);
}

sortSelect.addEventListener("change", (e) => {
  const value = (e.target as HTMLSelectElement).value;
  sortDocuments(value);
});

async function init() {
  try {
    documents = await fetchDocuments();
    sortDocuments(sortSelect.value); // render sorted on load
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
