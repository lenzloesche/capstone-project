import GlobalStyle from "../styles";
import Head from "next/head";
import {useEffect, useState} from "react";
import apiGetFavorite from "../apiServices/apiGetFavorite";
import apiGet from "../apiServices/apiGet";
import Header from "../components/Header";
import Heading from "../components/Heading";
import NavigationLink from "../components/NavigationLink";
import StyledImage from "../components/StyledImage";

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
    clearData();
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

  function clearData() {
    setData(startingData);
    setFavoriteExercises(favoriteExerciseStart);
  }

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project Fitness App</title>
      </Head>
      <Header>
        <Heading>|Fitness App</Heading>
        <NavigationLink selected={false} href="/">
          <StyledImage
            width="36"
            height="36"
            alt="gear wheel options"
            src="/gear-wheel.svg"
          />
        </NavigationLink>
      </Header>
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
