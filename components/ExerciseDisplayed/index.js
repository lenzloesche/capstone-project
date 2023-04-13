import FormContainer from "../FormContainer";
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
            handleFavoriteClick(dat);
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
        <em>Name:</em> {dat?.name}
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
            <em>Difficulty:</em> {dat?.difficulty}
          </StyledParagraphPadding>
          <StyledParagraphPadding>
            <em>Muslce:</em> {dat?.muscle}
          </StyledParagraphPadding>
          <StyledParagraphPadding>
            <em>Type:</em> {dat?.type}
          </StyledParagraphPadding>
          <StyledParagraphPadding>
            <em>Equipment:</em> {dat?.equipment}
          </StyledParagraphPadding>
          <StyledParagraphPadding>
            <em>Instructions:</em> {dat?.instructions}
          </StyledParagraphPadding>
        </>
      ) : (
        ""
      )}
    </FormContainer>
  );
}
