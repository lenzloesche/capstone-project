import {uid} from "uid";
import StyledSelect from "../../StyledSelect";

export default function FavoriteSelect({favoriteExercises}) {
  if (favoriteExercises.length === 0) {
    return (
      <>
        <StyledSelect id="selection" name="selection">
          <option value="manually">Enter manually</option>
        </StyledSelect>
      </>
    );
  }
  return (
    <>
      <StyledSelect id="selection" name="selection">
        <option value="manually">Enter manually</option>
        {favoriteExercises.map((eachExercise) => {
          return (
            <option key={uid()} value={eachExercise.name}>
              {eachExercise.name}{" "}
            </option>
          );
        })}
      </StyledSelect>
    </>
  );
}
