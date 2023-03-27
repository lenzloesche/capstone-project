import dbConnect from "../../../../db/connect";
import FavoriteExercise from "../../../../db/models/FavoriteExercise";

export default async function handler(request, response) {
  await dbConnect();
  const {id} = request.query;
  if (request.method === "GET") {
    const favoriteExercises = await FavoriteExercise.find({userName: id});
    console.log("favoriteExercises server", favoriteExercises, "id", id);
    return response.status(200).json(favoriteExercises);
  } else if (request.method === "POST") {
    const favoriteExercisesData = request.body;
    let favoriteExercises = await FavoriteExercise.find({userName: id});
    if (favoriteExercises.length === 0) {
      console.log("favoriteExercises is empty", favoriteExercises);
      favoriteExercises = new FavoriteExercise({
        userName: id,
        favorites: [],
      });
      favoriteExercises.favorites.push(favoriteExercisesData);
      await favoriteExercises.save();
    } else {
      console.log("favoriteExercises", favoriteExercises);
      favoriteExercises[0].favorites.push(favoriteExercisesData);
      await favoriteExercises[0].save();
    }

    return response.status(201).json({
      statusText: "Successfully created favoriteExercises",
      status: 201,
      _id: favoriteExercises._id,
    });
  } else {
    return response.status(405).json({message: "Method not allowed"});
  }
}
