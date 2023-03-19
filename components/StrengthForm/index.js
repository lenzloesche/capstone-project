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
      <br />
      <Input
        id="exercise"
        type="text"
        value={inputText[0]}
        onChange={(event) => handleChange(event, 0)}
        required
      ></Input>

      <br />
      <Label htmlFor="kilos">How many kilograms?</Label>
      <br />
      <Input
        id="kilos"
        type="number"
        value={inputText[1]}
        onChange={(event) => handleChange(event, 1)}
        required
      ></Input>

      <br />
      <Label htmlFor="reps">How many reps?</Label>
      <br />
      <Input
        id="reps"
        type="number"
        value={inputText[2]}
        onChange={(event) => handleChange(event, 2)}
        required
      ></Input>

      <br />
      <Label htmlFor="sets">How many sets?</Label>
      <br />
      <Input
        id="sets"
        type="number"
        value={inputText[3]}
        onChange={(event) => handleChange(event, 3)}
        required
      ></Input>

      <br />
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
