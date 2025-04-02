import { createDocument } from "@/utils/createDocument";
import { addDocument } from "@/services/documents";

export function initializeForm(
  sortValue: string,
  sortDocuments: (criteria: string) => void
) {
  const showFormBtn = document.getElementById("show-form-btn")!;
  const form = document.getElementById("new-doc-form") as HTMLFormElement;
  const titleInput = document.querySelector<HTMLInputElement>("#doc-title")!;
  const versionInput =
    document.querySelector<HTMLInputElement>("#doc-version")!;
  const contributorsInput =
    document.querySelector<HTMLInputElement>("#doc-contributors")!;
  const attachmentsInput =
    document.querySelector<HTMLInputElement>("#doc-attachments")!;

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
    addDocument(newDoc);
    sortDocuments(sortValue);

    form.reset();
    form.classList.add("d-none");
    showFormBtn.classList.remove("d-none");
    window.scrollTo(0, 0);
  });

  showFormBtn.addEventListener("click", () => {
    form.classList.remove("d-none");
    showFormBtn.classList.add("d-none");
  });
}
