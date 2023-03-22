import dbConnect from "../../../db/connect";
import Exercise from "../../../db/models/Exercise";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const exercises = await Exercise.find();
    return response.status(200).json(exercises);
  } else if (request.method === "POST") {
    const exerciseData = request.body;
    const exercise = new Exercise(exerciseData);
    await exercise.save();

    return response.status(201).json({
      statusText: "Successfully created exercise",
      status: 201,
      _id: exercise._id,
    });
  } else if (request.method === "DELETE") {
    const ExerciseToDelete = await Exercise.findByIdAndDelete(id);
    return response.status(200).json({ status: "Exercise deleted", _id: id });
  } else if (request.method === "PUT") {
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
