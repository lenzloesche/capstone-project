import FormContainer from "../FormContainer";
import Image from "next/image";
import StyledParagraphPadding from "../StyledParagraphPadding";
import StyledButton from "../StyledButton";
import StyledImage from "../StyledImage";

export default function ExerciseDisplayed({
  showFavorites,
  dat,
  handleFavoriteClick,
  handleDetailsClick,
  showDetails,
  index,
}) {
  return (
    <FormContainer>
      {dat.isFavorite || showFavorites ? (
        <StyledImage
          onClick={() => {
            handleFavoriteClick(dat);
          }}
          className="small-border bookmark"
          src="/bookmarkstar.svg"
          alt="star image"
          width="40"
          height="40"
          isitselected={false}
        ></StyledImage>
      ) : (
        <StyledImage
          onClick={() => {
            handleFavoriteClick(dat);
          }}
          className="small-border bookmark"
          src="/bookmark.svg"
          alt="star image"
          width="40"
          height="40"
          isitselected={false}
        ></StyledImage>
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
