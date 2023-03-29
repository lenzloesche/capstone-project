import GlobalStyle from "../styles";
import Head from "next/head";
import {useEffect, useState} from "react";
import apiGetFavorite from "../apiServices/apiGetFavorite";
const favoriteExerciseStart = [];

export default function App({Component, pageProps}) {
  const [userName, setUserName] = useState("DontRender");
  const [favoriteExercises, setFavoriteExercises] = useState(
    favoriteExerciseStart
  );
  const [fetchingStatus, setFetchingStatus] = useState("none");

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
    setUserName(savedUserName);
  }, []);

  useEffect(() => {
    if (userName !== "DontRender") {
      apiGetFavorite(userName, setFavoriteExercises, setFetchingStatus);
    }
  }, [userName]);

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project Fitness App</title>
      </Head>
      <Component
        favoriteExercises={favoriteExercises}
        setFavoriteExercises={setFavoriteExercises}
        fetchingStatus={fetchingStatus}
        setFetchingStatus={setFetchingStatus}
        userName={userName}
        handleUserNameFormSubmit={handleUserNameFormSubmit}
        {...pageProps}
      />
    </>
  );
}
