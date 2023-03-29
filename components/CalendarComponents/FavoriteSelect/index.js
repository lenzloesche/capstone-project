import {uid} from "uid";
import StyledSelect from "../../StyledSelect";

export default function FavoriteSelect({favoriteExercises, handleChange}) {
  function handleSelectChange(event) {
    console.log(event.target.value);
    handleChange(event, "exerciseStrength");
  }

  if (favoriteExercises.length === 0) {
    return (
      <>
        <StyledSelect
          id="selection"
          name="selection"
          onChange={(event) => {
            handleSelectChange(event);
          }}
        >
          <option value="manually">No Favorites Yet</option>
        </StyledSelect>
      </>
    );
  }
  return (
    <>
      <StyledSelect
        id="selection"
        name="selection"
        onChange={(event) => {
          handleSelectChange(event);
        }}
      >
        <option value="manually">Select Favorites</option>
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
