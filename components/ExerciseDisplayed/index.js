import FormContainer from "../FormContainer";
import StyledParagraphPadding from "../StyledParagraphPadding";
import StyledButton from "../StyledButton";
import StyledImage from "../StyledImage";
import {uid} from "uid";

export default function ExerciseDisplayed({
  showFavorites,
  singleData,
  handleFavoriteClick,
  handleDetailsClick,
  showDetails,
  index,
}) {
  const instructionsSplit = makeArrayFromText(singleData.instructions);
  function makeArrayFromText(text) {
    const sentences = text.split(". ");
    return sentences;
  }

  return (
    <FormContainer>
      {singleData.isFavorite || showFavorites ? (
        <StyledImage
          onClick={() => {
            handleFavoriteClick(singleData);
          }}
          bookmark
          src="/bookmark-solid.svg"
          alt="bookmark selected image"
          width="40"
          height="40"
          isitselected={false}
        ></StyledImage>
      ) : (
        <StyledImage
          onClick={() => {
            handleFavoriteClick(singleData);
          }}
          bookmark
          src="/bookmark-regular.svg"
          alt="bookmark image"
          width="40"
          height="40"
          isitselected={false}
        ></StyledImage>
      )}
      <StyledParagraphPadding>
        <em>Name:</em> {singleData?.name}
      </StyledParagraphPadding>
      <StyledButton
        onClick={() => {
          handleDetailsClick(index);
        }}
      >
        {showDetails[index] ? "Hide" : "Show"} Details
      </StyledButton>
      {showDetails[index] ? (
        <>
          <StyledParagraphPadding>
            <em>Difficulty:</em> {singleData?.difficulty}
          </StyledParagraphPadding>
          <StyledParagraphPadding>
            <em>Muslce:</em> {singleData?.muscle}
          </StyledParagraphPadding>
          <StyledParagraphPadding>
            <em>Type:</em> {singleData?.type}
          </StyledParagraphPadding>
          <StyledParagraphPadding>
            <em>Equipment:</em> {singleData?.equipment}
          </StyledParagraphPadding>
          <StyledParagraphPadding>
            <em>Instructions:</em>
          </StyledParagraphPadding>
          {instructionsSplit.map((sentence) => {
            return (
              <StyledParagraphPadding key={uid()}>
                {sentence}
                {"."}
              </StyledParagraphPadding>
            );
          })}
        </>
      ) : (
        ""
      )}
    </FormContainer>
  );
}
