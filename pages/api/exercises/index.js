import dbConnect from "../../../db/connect";
import Exercise from "../../../db/models/Exercise";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const exercises = await Exercise.find();
    return response.status(200).json(exercises);
  } else if (request.method === "POST") {
    const jokeData = request.body;
    const joke = new Exercise(jokeData);
    await joke.save();

    response.status(201).json({ status: "Exercise created" });
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
