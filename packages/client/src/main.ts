import "./styles/global.css";
import { fetchDocuments } from "./api/fetchDocuments";
import { renderDocumentList } from "./components/DocumentList";
import { connectToNotifications } from "./realtime/websocket";
import { setupNotificationCounter } from "./components/LiveNotifications";

const container = document.querySelector<HTMLDivElement>("#document-list")!;
const notificationCounterEl = document.querySelector<HTMLParagraphElement>(
  "#notification-counter"
)!;
async function init() {
  try {
    const documents = await fetchDocuments();
    renderDocumentList(container, documents);
  } catch (err) {
    container.textContent = "Error loading documents";
    console.error(err);
  }

  const counter = setupNotificationCounter(notificationCounterEl);

  connectToNotifications(() => {
    counter.increment();
  });
}

init();
