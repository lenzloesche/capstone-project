import FormContainer from "../FormContainer";
import Image from "next/image";
import StyledParagraphPadding from "../StyledParagraphPadding";
import StyledButton from "../StyledButton";

export default function ExerciseDisplayed({
  dat,
  handleFavoriteClick,
  handleDetailsClick,
  showDetails,
  index,
}) {
  return (
    <FormContainer>
      {dat.isFavorite ? (
        <Image
          onClick={() => {
            handleFavoriteClick(dat);
          }}
          className="small-border bookmark"
          src="/bookmarkstar.svg"
          alt="star image"
          width="40"
          height="40"
        ></Image>
      ) : (
        <Image
          onClick={() => {
            handleFavoriteClick(dat);
          }}
          className="small-border bookmark"
          src="/bookmark.svg"
          alt="star image"
          width="40"
          height="40"
        ></Image>
      )}
      <StyledParagraphPadding>Name: {dat?.name}</StyledParagraphPadding>
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
            Difficulty: {dat?.difficulty}
          </StyledParagraphPadding>
          <StyledParagraphPadding>Muslce: {dat?.muscle}</StyledParagraphPadding>
          <StyledParagraphPadding>Type: {dat?.type}</StyledParagraphPadding>
          <StyledParagraphPadding>
            Equipment: {dat?.equipment}
          </StyledParagraphPadding>
          <StyledParagraphPadding>
            Instructions: {dat?.instructions}
          </StyledParagraphPadding>
        </>
      ) : (
        ""
      )}
    </FormContainer>
  );
}
