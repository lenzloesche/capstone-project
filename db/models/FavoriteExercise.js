import mongoose from "mongoose";

const {Schema} = mongoose;

const favoriteExerciseSchema = new Schema({
  name: {type: String, required: true},
  difficulty: {type: String},
  muscle: {type: String},
  type: {type: String},
  equipment: {type: String},
  instructions: {type: String},
});

const FavoriteExercise =
  mongoose?.models?.FavoriteExercise ||
  mongoose.model(
    "FavoriteExercise",
    favoriteExerciseSchema,
    "favoriteExercises"
  );

export default FavoriteExercise;
