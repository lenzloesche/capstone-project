import Input from "../Input";
import Label from "../Label";
import Form from "../Form";
import StyledButton from "../StyledButton";
import StyledParagraph from "../StyledParagraph";

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
      <Label htmlFor="exerciseRunning">Which exercise?</Label>
      <StyledParagraph>Did you walk or run up mountains?</StyledParagraph>
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
      <StyledButton
        onClick={(event) => {
          handleCancelClick(event);
        }}
      >
        Cancel
      </StyledButton>
    </Form>
  );
}
