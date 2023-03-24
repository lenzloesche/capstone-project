export default async function apiPost(save, setFetchingStatus) {
  setFetchingStatus("Currently Posting");
  const response = await fetch("/api/exercises", {
    method: "POST",
    body: JSON.stringify(save),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    setFetchingStatus("Saved");
  } else {
    setFetchingStatus("Error");
    console.error(`Error: ${response.status}`);
  }
}
