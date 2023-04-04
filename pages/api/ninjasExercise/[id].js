const url = "https://api.api-ninjas.com/v1/exercises";
const apiKey = process.env.EXERCISES_APIKEY;

export default async function handler(request, response) {
  if (request.method === "GET") {
    const {difficulty, name, type, muscle} = request.query;
    let apiString = "?name=" + name;
    if (difficulty) {
      apiString += "&difficulty=" + difficulty;
    }

    if (type) {
      apiString += "&type=" + type;
    }
    if (muscle) {
      apiString += "&muscle=" + muscle;
    }

    try {
      const responseNinja = await fetch(url + apiString, {
        headers: {
          "x-api-key": apiKey,
        },
      });
      if (responseNinja.ok) {
        const dataFetch = await responseNinja.json();
        return response.status(200).json(dataFetch);
      } else {
        console.error("Response not OK.");
        return response.status(400).json({message: "Response not OK."});
      }
    } catch (error) {
      console.error("Error fetching: ", error);
      return response.status(400).json({message: "Error fetching."});
    }
  } else {
    return response.status(405).json({message: "Method not allowed"});
  }
}
