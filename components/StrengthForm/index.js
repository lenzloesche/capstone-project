import Input from "../Input";
import Label from "../Label";
import Form from "../Form";
import StyledButton from "../StyledButton";

export default function StrengthForm({
  handleSubmit,
  handleCancelClick,
  handleChange,
  editMode,
  inputText,
}) {
  return (
    <Form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <Label htmlFor="exerciseStrength">Which exercise?</Label>

      <Input
        id="exerciseStrength"
        type="text"
        value={inputText.exerciseStrength}
        onChange={(event) => handleChange(event, "exerciseStrength")}
        required
      ></Input>

      <Label htmlFor="kilos">How many kilograms?</Label>

      <Input
        id="kilos"
        type="number"
        value={inputText.kilos}
        onChange={(event) => handleChange(event, "kilos")}
        required
      ></Input>

      <Label htmlFor="reps">How many reps?</Label>

      <Input
        id="reps"
        type="number"
        value={inputText.reps}
        onChange={(event) => handleChange(event, "reps")}
        required
      ></Input>

      <Label htmlFor="sets">How many sets?</Label>

      <Input
        id="sets"
        type="number"
        value={inputText.sets}
        onChange={(event) => handleChange(event, "sets")}
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
