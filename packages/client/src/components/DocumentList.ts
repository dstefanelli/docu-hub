import { Document } from "@/types/document";

export function renderDocumentList(
  container: any,
  documents: Document[],
  templateId: string
) {
  container.innerHTML = "";

  if (documents.length === 0) {
    container.textContent = "No documents found.";
    return;
  }

  const template = document.getElementById(templateId) as HTMLTemplateElement;

  documents.forEach((doc) => {
    const clone = template.content.cloneNode(true) as HTMLElement;

    // Render Title
    (clone.querySelector(".card-title") as HTMLElement).textContent = doc.Title;

    // Render version
    (
      clone.querySelector(".card-version") as HTMLElement
    ).textContent = `Version ${doc.Version}`;

    // Render attachments
    const attachmentsList = clone.querySelector(
      ".attachments-list"
    ) as HTMLUListElement;
    if (doc.Attachments.length > 0) {
      doc.Attachments.forEach((att) => {
        const li = document.createElement("li");
        li.textContent = att;
        attachmentsList.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "No attachments";
      attachmentsList.appendChild(li);
    }

    // Render contributors
    const contributorsList = clone.querySelector(
      ".contributors-list"
    ) as HTMLUListElement;
    if (doc.Contributors.length > 0) {
      doc.Contributors.forEach((c) => {
        const li = document.createElement("li");
        li.textContent = c.Name;
        contributorsList.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "No contributors";
      contributorsList.appendChild(li);
    }
    container.appendChild(clone);
  });
}
