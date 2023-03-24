import Image from "next/image";
import FormContainer from "../FormContainer";
import ImageContainer from "../ImageContainer";
import StyledParagraphNormal from "../StyledParagraphNormal";
import StrengthForm from "../StrengthForm";
import RunningForm from "../RunningForm";

export default function FormStrengthAndRunning({
  handleImageClick,
  sportSelected,
  editMode,
  handleSubmit,
  handleCancelClick,
  handleChange,
  inputText,
  day,
}) {
  return (
    <>
      <FormContainer>
        <ImageContainer>
          <Image
            className={sportSelected === "strength" ? "border" : "small-border"}
            onClick={() => {
              handleImageClick("strength");
            }}
            src="/strength.svg"
            alt="strength image of an Arm"
            width="100"
            height="100"
          ></Image>
          <Image
            className={sportSelected === "running" ? "border" : "small-border"}
            onClick={() => {
              handleImageClick("running");
            }}
            src="/running.svg"
            alt="running image runner"
            width="100"
            height="100"
          ></Image>
        </ImageContainer>
        <StyledParagraphNormal className="big-text">
          Selected: {sportSelected === "running" ? "Running" : "Workout"}
        </StyledParagraphNormal>
        {!editMode.editModeOn ? (
          <>
            <StyledParagraphNormal className="big-text">
              {"New Entry for today:"}
            </StyledParagraphNormal>
            <StyledParagraphNormal className="big-text">
              {"It's " +
                day +
                `. Did you ${
                  sportSelected === "running" ? "run" : "work out"
                } today?`}
            </StyledParagraphNormal>
          </>
        ) : (
          <StyledParagraphNormal className="big-text">
            {"Editing for: " +
              (editMode.selectedData.date.getMonth() + 1).toString() +
              "/" +
              editMode.selectedData.date.getDate().toString() +
              "/" +
              editMode.selectedData.date.getFullYear().toString()}
          </StyledParagraphNormal>
        )}

        {sportSelected === "strength" ? (
          <StrengthForm
            handleSubmit={handleSubmit}
            handleCancelClick={handleCancelClick}
            handleChange={handleChange}
            editMode={editMode}
            inputText={inputText}
          />
        ) : (
          <RunningForm
            handleSubmit={handleSubmit}
            handleCancelClick={handleCancelClick}
            handleChange={handleChange}
            editMode={editMode}
            inputText={inputText}
          />
        )}
      </FormContainer>
    </>
  );
}
