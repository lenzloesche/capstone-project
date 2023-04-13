import Heading from "../components/Heading";
import UserNameForm from "../components/UserNameForm";
import Navigation from "../components/Navigation";
import StrengthContainer from "../components/StrengthContainer";
import StyledParagraph from "../components/StyledParagraph";
import StyledParagraphNormal from "../components/StyledParagraphNormal";
import FormContainer from "../components/FormContainer";
import Link from "next/link";

export default function Home({userName, handleUserNameFormSubmit}) {
  return (
    <>
      <main>
        <StrengthContainer>
          <UserNameForm
            userName={userName}
            handleUserNameFormSubmit={handleUserNameFormSubmit}
          ></UserNameForm>
          {userName === "DontRender" ? (
            ""
          ) : (
            <FormContainer>
              <StyledParagraphNormal>Credits</StyledParagraphNormal>
              <Link href="https://pixabay.com/vectors/arm-exercise-fist-flex-health-2029406/">
                <StyledParagraph>Muscle Arm</StyledParagraph>
              </Link>
              <StyledParagraph>by OpenClipart-Vectors.</StyledParagraph>
              <StyledParagraph>---</StyledParagraph>
              <Link href="https://pixabay.com/vectors/man-running-silhouette-black-40739/">
                <StyledParagraph>Man Running Silhouette</StyledParagraph>
              </Link>
              <StyledParagraph>by Clker-Free-Vector-Images.</StyledParagraph>
              <StyledParagraph>---</StyledParagraph>
              <Link href="https://pixabay.com/photos/action-jump-woman-exercise-figure-1850677/">
                <StyledParagraph>Action Jump Woman Exercise.</StyledParagraph>
              </Link>
              <StyledParagraph>by Pexels</StyledParagraph>
              <StyledParagraph>---</StyledParagraph>
              <Link href="https://pixabay.com/vectors/search-find-magnifier-zoom-glass-6699087/">
                <StyledParagraph>Magnifiyng Glass</StyledParagraph>
              </Link>
              <StyledParagraph>by thehalaldesign.</StyledParagraph>
              <StyledParagraph>---</StyledParagraph>
              <Link href="https://pixabay.com/vectors/bookmark-label-reading-simple-6751603/">
                <StyledParagraph>Boomkark</StyledParagraph>
              </Link>
              <StyledParagraph>by Hedgye.</StyledParagraph>
              <StyledParagraph>---</StyledParagraph>
              <Link href="https://pixabay.com/vectors/bookmark-label-reading-simple-6751594/">
                <StyledParagraph>Bookmark Star</StyledParagraph>
              </Link>
              <StyledParagraph>by Hedgye.</StyledParagraph>
              <StyledParagraph>---</StyledParagraph>
              <Link href="https://pixabay.com/vectors/gear-wheel-gears-toothed-wheel-304395/">
                <StyledParagraph>Gear</StyledParagraph>
              </Link>
              <StyledParagraph>by Clker-Free-Vector-Images.</StyledParagraph>
              <StyledParagraph>---</StyledParagraph>
              <Link href="https://fontawesome.com/">
                <StyledParagraph>Fontawesome</StyledParagraph>
              </Link>
              <StyledParagraph>
                Bookmark-regular, Bookmark-solid, bowl-food-solid,
                dumbbell-solid.
              </StyledParagraph>
              <StyledParagraph>---</StyledParagraph>
              <Link href="https://fonts.google.com/specimen/Roboto">
                <StyledParagraph>Roboto Font</StyledParagraph>
              </Link>
              <StyledParagraph>by Google.</StyledParagraph>
              <StyledParagraph>---</StyledParagraph>
            </FormContainer>
          )}
        </StrengthContainer>
      </main>
      {userName === "DontRender" ? (
        ""
      ) : (
        <Navigation selected={"index"} userName={userName} />
      )}
    </>
  );
}
