import GlobalStyle from "../styles";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";

export default function App({Component, pageProps}) {
  const [userName, setUserName] = useLocalStorageState("fitnessAppUserName", {
    defaultValue: "TestName",
  });
  function handleUserNameFormSubmit(event, userInput) {
    event.preventDefault();
    setUserName(userInput);
  }
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project Fitness App</title>
      </Head>
      <Component
        userName={userName}
        handleUserNameFormSubmit={handleUserNameFormSubmit}
        {...pageProps}
      />
    </>
  );
}
