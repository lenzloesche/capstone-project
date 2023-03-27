/* import dbConnect from "../../../../db/connect";
import Exercise from "../../../../db/models/Exercise";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const exercises = await Exercise.find({ userName: "" });
    return response.status(200).json(exercises);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
 */
