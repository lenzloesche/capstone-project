import Heading from "../components/Heading";
import UserNameForm from "../components/UserNameForm";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import StrengthContainer from "../components/StrengthContainer";
export default function Home({userName, handleUserNameFormSubmit}) {
  return (
    <>
      <main>
        <Header>
          <Heading>Fitness App</Heading>
        </Header>
        <StrengthContainer>
          <UserNameForm
            userName={userName}
            handleUserNameFormSubmit={handleUserNameFormSubmit}
          ></UserNameForm>
        </StrengthContainer>
      </main>
      {userName === "DontRender" ? (
        ""
      ) : (
        <Navigation selected={"index"} userName={userName}></Navigation>
      )}
    </>
  );
}
