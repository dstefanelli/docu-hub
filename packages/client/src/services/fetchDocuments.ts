export async function fetchDocuments() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const documentsUrl = `${apiUrl}/documents`;

  const response = await fetch(documentsUrl);
  if (!response.ok) throw new Error("Error fetching documents");
  const data = response.json();
  return data;
}
