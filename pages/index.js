import Heading from "../components/Heading";
import UserNameForm from "../components/UserNameForm";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import StrengthContainer from "../components/StrengthContainer";
import StyledParagraph from "../components/StyledParagraph";

export default function Home({userName, handleUserNameFormSubmit}) {
  return (
    <>
      <main>
        <StrengthContainer>
          <Header>
            <Heading>Fitness App</Heading>
          </Header>
          <UserNameForm
            userName={userName}
            handleUserNameFormSubmit={handleUserNameFormSubmit}
          ></UserNameForm>
        </StrengthContainer>
      </main>
      {userName === "DontRender" ? (
        ""
      ) : (
        <Navigation selected={"index"} userName={userName}>
          {" "}
          <StyledParagraph>Info:</StyledParagraph>
        </Navigation>
      )}
    </>
  );
}
