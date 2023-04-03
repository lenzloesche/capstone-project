import StrengthContainer from "../components/StrengthContainer";
import Navigation from "../components/Navigation";
import Heading from "../components/Heading";
import Header from "../components/Header";
import StyledParagraph from "../components/StyledParagraph";

export default function Diet({userName}) {
  return (
    <>
      <main>
        <StrengthContainer>
          <Header>
            <Heading>Fitness App</Heading>
          </Header>
          <StyledParagraph>Diet</StyledParagraph>
        </StrengthContainer>
      </main>

      <Navigation selected={"diet"} userName={userName}></Navigation>
    </>
  );
}
