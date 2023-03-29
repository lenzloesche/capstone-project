import {uid} from "uid";
import StyledSelect from "../../StyledSelect";

export default function FavoriteSelect({favoriteExercises}) {
  return (
    <>
      <StyledSelect>
        {favoriteExercises.map((eachExercise) => {
          return <option key={uid()}>{eachExercise.name} </option>;
        })}
      </StyledSelect>
    </>
  );
}
