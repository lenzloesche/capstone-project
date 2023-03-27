import dbConnect from "../../../../db/connect";
import FavoriteExercise from "../../../../db/models/FavoriteExercise";

export default async function handler(request, response) {
  await dbConnect();
  const {id} = request.query;
  if (request.method === "GET") {
    const favoriteExercises = await FavoriteExercise.find({userName: id});
    return response.status(200).json(favoriteExercises);
  } else if (request.method === "POST") {
    const favoriteExercisesData = request.body;
    const favoriteExercises = new FavoriteExercise({
      userName: id,
      favorites: [],
    });
    favoriteExercises.favorites.push(favoriteExercisesData);
    await favoriteExercises.save();

    return response.status(201).json({
      statusText: "Successfully created favoriteExercises",
      status: 201,
      _id: favoriteExercises._id,
    });
  } else {
    return response.status(405).json({message: "Method not allowed"});
  }
}
