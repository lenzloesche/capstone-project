import Input from "../Input";
import Label from "../Label";
import Form from "../Form";
import StyledButton from "../StyledButton";
import FavoriteSelect from "../CalendarComponents/FavoriteSelect";

export default function RunningForm({
  handleSubmit,
  handleCancelClick,
  handleChange,
  editMode,
  inputText,
  favoriteExercises,
}) {
  return (
    <Form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <Label htmlFor="exerciseRunning">Which exercise?</Label>
      <FavoriteSelect favoriteExercises={favoriteExercises} />
      <Input
        id="exerciseRunning"
        type="text"
        value={inputText.exerciseRunning}
        onChange={(event) => handleChange(event, "exerciseRunning")}
        required
      ></Input>

      <Label htmlFor="kiloms">How many kilometers?</Label>

      <Input
        id="kiloms"
        type="number"
        value={inputText.kiloms}
        onChange={(event) => handleChange(event, "kiloms")}
        required
      ></Input>

      <Label htmlFor="mins">How many minutes?</Label>

      <Input
        id="mins"
        type="number"
        value={inputText.mins}
        onChange={(event) => handleChange(event, "mins")}
        required
      ></Input>

      <StyledButton type="submit">Save</StyledButton>
      {editMode.editModeOn ? (
        <StyledButton
          onClick={(event) => {
            handleCancelClick(event);
          }}
        >
          Cancel
        </StyledButton>
      ) : (
        ""
      )}
    </Form>
  );
}
