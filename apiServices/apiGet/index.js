export default async function apiGet(userName, setData, setFetchingStatus) {
  setFetchingStatus("Currently fetching");
  try {
    const response = await fetch(`/api/exercises/users/${userName}`);
    if (response.ok) {
      const dataFetch = await response.json();
      for (let i = 0; i < dataFetch.length; i++) {
        dataFetch[i].date = new Date(dataFetch[i].date);
      }
      setData(dataFetch);
      setFetchingStatus("Done fetching");
    } else {
      console.error("Response not OK.");
      setFetchingStatus("Error");
    }
  } catch (error) {
    console.error("Error fetching: ", error);
    setFetchingStatus("Error");
  }
}
