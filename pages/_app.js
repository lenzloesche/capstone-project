import GlobalStyle from "../styles";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";
import {useEffect, useState} from "react";

export default function App({Component, pageProps}) {
  /* const [userName, setUserName] = useLocalStorageState("fitnessAppUserName", {
    defaultValue: "DontRender",
  }); */
  const [userName, setUserName] = useState("DontRender");
  function handleUserNameFormSubmit(event, userInput) {
    event.preventDefault();
    setUserName(userInput);
    localStorage.setItem("fitnessAppUserName", JSON.stringify(userInput));
  }

  useEffect(() => {
    let savedUserName = JSON.parse(localStorage.getItem("fitnessAppUserName"));
    if (savedUserName === null) {
      savedUserName = "DontRender";
    }
    console.log("savedUserName", savedUserName);
    setUserName(savedUserName);
  }, []);

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
