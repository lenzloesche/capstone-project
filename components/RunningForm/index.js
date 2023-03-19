import Input from "../Input";
import Label from "../Label";
import Form from "../Form";
import StyledButton from "../StyledButton";

export default function RunningForm({
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

      <Label htmlFor="kiloms">How many kilometers?</Label>

      <Input
        id="kiloms"
        type="number"
        value={inputText[1]}
        onChange={(event) => handleChange(event, 1)}
        required
      ></Input>

      <Label htmlFor="mins">How many minutes?</Label>

      <Input
        id="mins"
        type="number"
        value={inputText[2]}
        onChange={(event) => handleChange(event, 2)}
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
