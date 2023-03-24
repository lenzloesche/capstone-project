export default async function apiDelete(id, setFetchingStatus) {
  setFetchingStatus("Currently Fetching");
  const response = await fetch(`/api/exercises/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    setFetchingStatus("Deleted");
    console.log("deleted");
  } else {
    setFetchingStatus("Error");

    console.error(`Error: ${response.status}`);
  }
}
