const url = "/api/ninjasExercise/exercises";

export default async function fetchStrength(input) {
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
