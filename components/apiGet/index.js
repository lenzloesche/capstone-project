export default async function apiGet(currentUser, setData) {
  try {
    const response = await fetch(`/api/exercises/users/${currentUser}`);
    if (response.ok) {
      const dataFetch = await response.json();
      for (let i = 0; i < dataFetch.length; i++) {
        dataFetch[i].date = new Date(dataFetch[i].date);
      }
      console.log("datafetch", dataFetch);
      setData(dataFetch);
    } else {
      console.log("Response not OK.");
    }
  } catch (error) {
    console.log("Error fetching: ", error);
  }
}
