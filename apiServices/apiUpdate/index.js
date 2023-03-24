export default async function apiUpdate(id, save, setFetchingStatus) {
  setFetchingStatus("Currently Updating");
  if (id) {
    const response = await fetch(`/api/exercises/${id}`, {
      method: "PUT",
      body: JSON.stringify(save),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setFetchingStatus("Updated");
      console.log("updated");
    } else {
      setFetchingStatus("Error");
      console.error(`Error: ${response.status}`);
    }
  } else {
    setFetchingStatus("Error");
    console.error("Error: No _id found.");
  }
}
