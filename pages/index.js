import Heading from "../components/Heading";
import UserNameForm from "../components/UserNameForm";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
export default function Home({userName, handleUserNameFormSubmit}) {
  return (
    <>
      <main>
        <Header>
          <Heading>Fitness App</Heading>
        </Header>
        <UserNameForm
          userName={userName}
          handleUserNameFormSubmit={handleUserNameFormSubmit}
        ></UserNameForm>
      </main>
      <Navigation selected={"index"} userName={userName}></Navigation>
    </>
  );
}
