export default async function apiGet(userName) {
  try {
    const response = await fetch(`/api/exercises/users/${userName}`);
    if (response.ok) {
      const dataFetch = await response.json();
      for (let i = 0; i < dataFetch.length; i++) {
        dataFetch[i].date = new Date(dataFetch[i].date);
      }
      return dataFetch;
    } else {
      throw new Error("Response not OK.");
    }
  } catch (error) {
    throw new Error("Error fetching: ", error);
  }
}
