import FormContainer from "../FormContainer";
import Image from "next/image";
import Input from "../Input";
import StyledSelect from "../StyledSelect";
import StyledButton from "../StyledButton";
import ImageContainer from "../ImageContainer";
import Form from "../Form";
import StyledImage from "../StyledImage";
import StyledParagraph from "../StyledParagraph";

export default function StrengthSearchForm({
  handleSubmit,
  setSearchInput,
  searchInput,
  handleShowFavoritesClick,
  handleShowSearchClick,
  showFavorites,
}) {
  return (
    <FormContainer>
      {" "}
      <ImageContainer>
        <StyledImage
          onClick={handleShowSearchClick}
          className={showFavorites ? "small-border" : "border"}
          src="/search.svg"
          alt="search image of a magnifying glass"
          width="100"
          height="100"
          priority={true}
          isitselected={showFavorites ? false : true}
        ></StyledImage>
        <StyledImage
          onClick={handleShowFavoritesClick}
          className={showFavorites ? "border" : "small-border"}
          src="/bookmarkstar.svg"
          alt="star image"
          width="100"
          height="100"
          priority={true}
          isitselected={showFavorites ? true : false}
        ></StyledImage>
      </ImageContainer>
      {!showFavorites ? (
        <>
          <h2>Exercise Search</h2>
          <Form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            {" "}
            <Input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            ></Input>
            <StyledParagraph>
              try &quot;bell&quot; or &quot;back&quot;
            </StyledParagraph>
            <StyledButton>Search</StyledButton>
            <p>Filter:</p>
            <StyledSelect id="type" name="type">
              <option value="all_types">all types</option>
              <option value="cardio">cardio</option>
              <option value="olympic_weightlifting">
                olympic_weightlifting
              </option>
              <option value="plyometrics">plyometrics</option>
              <option value="powerlifting">powerlifting</option>
              <option value="strength">strength</option>
              <option value="stretching">stretching</option>
              <option value="strongman">strongman</option>
            </StyledSelect>
            <StyledSelect id="difficulty" name="difficulty">
              <option value="all_difficulties">all difficulties</option>
              <option value="beginner">beginner</option>
              <option value="intermediate">intermediate</option>
              <option value="expert">expert</option>
            </StyledSelect>
            <StyledSelect id="muscle" name="muscle">
              <option value="all_muscles">all muscles</option>
              <option value="abdominals">abdominals</option>
              <option value="abductors">abductors</option>
              <option value="adductors">adductors</option>
              <option value="biceps">biceps</option>
              <option value="calves">calves</option>
              <option value="chest">chest</option>
              <option value="forearms">forearms</option>
              <option value="glutes">glutes</option>
              <option value="hamstrings">hamstrings</option>
              <option value="lats">lats</option>
              <option value="lower_back">lower_back</option>
              <option value="middle_back">middle_back</option>
              <option value="neck">neck</option>
              <option value="quadriceps">quadriceps</option>
              <option value="traps">traps</option>
              <option value="triceps">triceps</option>
            </StyledSelect>
          </Form>
        </>
      ) : (
        <h2>Favorite Exercises</h2>
      )}
    </FormContainer>
  );
}
