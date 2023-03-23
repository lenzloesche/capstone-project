export default async function apiDelete(id) {
  const response = await fetch(`/api/exercises/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("deleted");
  } else {
    console.error(`Error: ${response.status}`);
  }
}
