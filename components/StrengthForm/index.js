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
      <Label htmlFor="exercise">Which exercise?</Label>

      <Input
        id="exercise"
        type="text"
        value={inputText[0]}
        onChange={(event) => handleChange(event, 0)}
        required
      ></Input>

      <Label htmlFor="kilos">How many kilograms?</Label>

      <Input
        id="kilos"
        type="number"
        value={inputText[1]}
        onChange={(event) => handleChange(event, 1)}
        required
      ></Input>

      <Label htmlFor="reps">How many reps?</Label>

      <Input
        id="reps"
        type="number"
        value={inputText[2]}
        onChange={(event) => handleChange(event, 2)}
        required
      ></Input>

      <Label htmlFor="sets">How many sets?</Label>

      <Input
        id="sets"
        type="number"
        value={inputText[3]}
        onChange={(event) => handleChange(event, 3)}
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
