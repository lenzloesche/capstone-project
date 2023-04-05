import GlobalStyle from "../styles";
import Head from "next/head";
import {useEffect, useState} from "react";
import apiGetFavorite from "../apiServices/apiGetFavorite";
import apiGet from "../apiServices/apiGet";

const favoriteExerciseStart = [];
let startingData = undefined;
export default function App({Component, pageProps}) {
  const [userName, setUserName] = useState("DontRender");
  const [favoriteExercises, setFavoriteExercises] = useState(
    favoriteExerciseStart
  );
  const [data, setData] = useState(startingData);

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
    if (
      userName !== "DontRender" &&
      userName !== undefined &&
      userName !== ""
    ) {
      getData();
      async function getData() {
        try {
          const data = await apiGetFavorite(userName);
          setFavoriteExercises(data);
        } catch (error) {
          console.error(error);
        }
        try {
          const data = await apiGet(userName);
          setData(data);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [userName]);

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project Fitness App</title>
      </Head>
      <Component
        data={data}
        setData={setData}
        favoriteExercises={favoriteExercises}
        setFavoriteExercises={setFavoriteExercises}
        userName={userName}
        handleUserNameFormSubmit={handleUserNameFormSubmit}
        {...pageProps}
      />
    </>
  );
}
