export default async function apiUpdate(id, save) {
  if (id) {
    const response = await fetch(`/api/exercises/${id}`, {
      method: "PUT",
      body: JSON.stringify(save),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("updated");
    } else {
      console.error(`Error: ${response.status}`);
    }
  } else {
    console.error("Error: No _id found.");
  }
}
