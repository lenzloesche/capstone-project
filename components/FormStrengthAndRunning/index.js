import Image from "next/image";
import FormContainer from "../FormContainer";
import ImageContainer from "../ImageContainer";
import StyledParagraphNormal from "../StyledParagraphNormal";
import StrengthForm from "../StrengthForm";
import RunningForm from "../RunningForm";
import StyledImage from "../StyledImage";

export default function FormStrengthAndRunning({
  handleImageClick,
  sportSelected,
  editMode,
  handleSubmit,
  handleCancelClick,
  handleChange,
  inputText,
  day,
  favoriteExercises,
}) {
  return (
    <>
      <FormContainer>
        <ImageContainer>
          <StyledImage
            addBorder={sportSelected === "strength"}
            addSmallBorder={sportSelected !== "strength"}
            onClick={() => {
              handleImageClick("strength");
            }}
            src="/strength.svg"
            alt="strength image of an Arm"
            width="100"
            height="100"
            isitselected={sportSelected === "strength" ? true : false}
          ></StyledImage>
          <StyledImage
            addBorder={sportSelected === "running"}
            addSmallBorder={sportSelected !== "running"}
            onClick={() => {
              handleImageClick("running");
            }}
            src="/running.svg"
            alt="running image runner"
            width="100"
            height="100"
            isitselected={sportSelected === "running" ? true : false}
          ></StyledImage>
        </ImageContainer>
        <StyledParagraphNormal bigText>
          Selected: {sportSelected === "running" ? "Running" : "Workout"}
        </StyledParagraphNormal>
        {!editMode.editModeOn ? (
          <>
            <StyledParagraphNormal bigText>
              {"New Entry for today:"}
            </StyledParagraphNormal>
            <StyledParagraphNormal bigText>
              {"It's " +
                day +
                `. Did you ${
                  sportSelected === "running" ? "run" : "work out"
                } today?`}
            </StyledParagraphNormal>
          </>
        ) : (
          <>
            <StyledParagraphNormal bigText>
              {"Editing for: " +
                (editMode.selectedData.date.getMonth() + 1).toString() +
                "/" +
                editMode.selectedData.date.getDate().toString() +
                "/" +
                editMode.selectedData.date.getFullYear().toString()}
            </StyledParagraphNormal>
            <StyledParagraphNormal>-</StyledParagraphNormal>
          </>
        )}

        {sportSelected === "strength" ? (
          <StrengthForm
            favoriteExercises={favoriteExercises}
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
