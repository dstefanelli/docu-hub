import "./styles/global.css";
import { fetchDocuments } from "./api/fetchDocuments";
import { renderDocumentList } from "./components/DocumentList";

const container = document.querySelector<HTMLDivElement>("#document-list");

async function init() {
  try {
    const documents = await fetchDocuments();
    renderDocumentList(container, documents);
  } catch (err) {
    if (container) container.textContent = "Error loading documents";
    console.error(err);
  }
}

init();
