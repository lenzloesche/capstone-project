const url = "/api/ninjas/";

export default async function fetchDiet(input) {
  try {
    const response = await fetch(url + input);
    if (response.ok) {
      const dataFetch = await response.json();
      return dataFetch;
    } else {
      throw new Error("Response not OK.");
    }
  } catch (error) {
    throw new Error("Error fetching: ", error);
  }
}
