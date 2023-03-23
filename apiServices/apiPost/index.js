export default async function apiPost(save) {
  const response = await fetch("/api/exercises", {
    method: "POST",
    body: JSON.stringify(save),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log("saved");
  } else {
    console.error(`Error: ${response.status}`);
  }
}
