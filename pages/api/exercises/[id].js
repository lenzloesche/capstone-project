import dbConnect from "../../../db/connect";
import Exercise from "../../../db/models/Exercise";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (request.method === "GET") {
    const exercises = await Exercise.findById(id);
    return response.status(200).json(exercises);
  } else if (request.method === "POST") {
  } else if (request.method === "DELETE") {
    const ExerciseToDelete = await Exercise.findByIdAndDelete(id);
    response.status(200).json({ status: "Exercise deleted" });
  } else if (request.method === "UPDATE") {
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
