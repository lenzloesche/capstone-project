import {useState, useEffect} from "react";
import Header from "../components/Header";
import {uid} from "uid";
import FormContainer from "../components/FormContainer";
import StyledButton from "../components/StyledButton";
import Heading from "../components/Heading";
import StrengthContainer from "../components/StrengthContainer";
import Navigation from "../components/Navigation";
import StyledParagraph from "../components/StyledParagraph";
import fetchStrength from "../apiServices/fetchStrength";
import StrengthSearchForm from "../components/StrengthSearchForm";
import NavigationLink from "../components/NavigationLink";
import useLocalStorageState from "use-local-storage-state";
import Image from "next/image";
import StyledParagraphPadding from "../components/StyledParagraphPadding";

const showDetailsStart = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

const favoriteExerciseStart = [];

export default function ExerciseSearch({userName}) {
  const [data, setData] = useState([]);
  const [dataWithFavorites, setDataWithFavorites] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [favoriteExercises, setFavoriteExercises] = useLocalStorageState(
    "favoriteExercises",
    {defaultValue: favoriteExerciseStart}
  );
  const [showDetails, setShowDetails] = useState(showDetailsStart);
  const [fetchingStatus, setFetchingStatus] = useState("none");
  const [showFavorites, setShowFavorites] = useState(false);

  function handleDetailsClick(index) {
    const newShowDetails = [...showDetails];
    newShowDetails[index] = !newShowDetails[index];
    setShowDetails(newShowDetails);
  }
  function resetDetails() {
    setShowDetails(showDetailsStart);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const difficulty = event.target.elements.difficulty.value;
    const type = event.target.elements.type.value;
    const muscle = event.target.elements.muscle.value;
    let apiString = "";
    if (difficulty != "all_difficulties") {
      apiString += "&difficulty=" + difficulty;
    }

    if (type != "all_types") {
      apiString += "&type=" + type;
    }
    if (muscle != "all_muscles") {
      apiString += "&muscle=" + muscle;
    }
    fetchStrength(
      "?name=" + searchInput + apiString,
      setFetchingStatus,
      setData,
      resetDetails
    );
  }

  function handleFavoriteClick(dat) {
    if (favoriteExercises.length === 0) {
      setFavoriteExercises([dat]);
    } else {
      const alreadyExistsAtIndex = favoriteExercises.findIndex(
        (favoriteExercise) => {
          return favoriteExercise.name === dat.name;
        }
      );
      if (alreadyExistsAtIndex != -1) {
        const newfavoriteExercises = favoriteExercises.slice();
        newfavoriteExercises.splice(alreadyExistsAtIndex, 1);
        setFavoriteExercises(newfavoriteExercises);
      } else {
        setFavoriteExercises([dat, ...favoriteExercises]);
      }
    }
  }

  function handleShowFavoritesClick() {
    setShowFavorites(true);
  }
  function handleShowSearchClick() {
    setShowFavorites(false);
  }

  useEffect(() => {
    let newData = data.slice();
    newData = newData.map((dat) => {
      let isFavorite = favoriteExercises.find((favoriteExercise) => {
        return dat.name === favoriteExercise.name;
      });
      isFavorite ? (isFavorite = true) : (isFavorite = false);
      return {...dat, isFavorite: isFavorite};
    });
    setDataWithFavorites(newData);
  }, [data, favoriteExercises]);

  if (userName === "DontRender") {
    return (
      <>
        <StrengthContainer>
          <Header>
            <Heading>Fitness App</Heading>
          </Header>
          <NavigationLink selected={false} href="/">
            {"Change User "}
          </NavigationLink>
        </StrengthContainer>
      </>
    );
  }
  return (
    <>
      <StrengthContainer>
        <Header>
          <Heading>Fitness App</Heading>
        </Header>
        <StrengthSearchForm
          handleSubmit={handleSubmit}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
          handleShowFavoritesClick={handleShowFavoritesClick}
          handleShowSearchClick={handleShowSearchClick}
          showFavorites={showFavorites}
        />
        {showFavorites ? (
          <>
            {favoriteExercises.map((favoriteExercise) => {
              return (
                <FormContainer key={uid()}>
                  <Image
                    onClick={() => {
                      handleFavoriteClick(favoriteExercise);
                    }}
                    className="small-border bookmark"
                    src="/bookmarkstar.svg"
                    alt="star image"
                    width="40"
                    height="40"
                  ></Image>
                  <p>Name: {favoriteExercise?.name}</p>
                </FormContainer>
              );
            })}{" "}
          </>
        ) : data?.length === 0 ? (
          <p>No Results</p>
        ) : (
          dataWithFavorites?.map((dat, index) => {
            return (
              <FormContainer key={uid()}>
                {dat.isFavorite ? (
                  <Image
                    onClick={() => {
                      handleFavoriteClick(dat);
                    }}
                    className="small-border bookmark"
                    src="/bookmarkstar.svg"
                    alt="star image"
                    width="40"
                    height="40"
                  ></Image>
                ) : (
                  <Image
                    onClick={() => {
                      handleFavoriteClick(dat);
                    }}
                    className="small-border bookmark"
                    src="/bookmark.svg"
                    alt="star image"
                    width="40"
                    height="40"
                  ></Image>
                )}
                <StyledParagraphPadding>
                  Name: {dat?.name}
                </StyledParagraphPadding>
                <StyledButton
                  onClick={() => {
                    handleDetailsClick(index);
                  }}
                >
                  {showDetails[index] ? "Hide" : "Show"} Details
                </StyledButton>
                {showDetails[index] ? (
                  <>
                    <StyledParagraphPadding>
                      Difficulty: {dat?.difficulty}
                    </StyledParagraphPadding>
                    <StyledParagraphPadding>
                      Muslce: {dat?.muscle}
                    </StyledParagraphPadding>
                    <StyledParagraphPadding>
                      Type: {dat?.type}
                    </StyledParagraphPadding>
                    <StyledParagraphPadding>
                      Equipment: {dat?.equipment}
                    </StyledParagraphPadding>
                    <StyledParagraphPadding>
                      Instructions: {dat?.instructions}
                    </StyledParagraphPadding>
                  </>
                ) : (
                  ""
                )}
              </FormContainer>
            );
          })
        )}
      </StrengthContainer>
      <Navigation selected={"exerciseSearch"} userName={userName}>
        <StyledParagraph isError={fetchingStatus === "Error" ? true : false}>
          Info: {fetchingStatus}
        </StyledParagraph>
      </Navigation>
    </>
  );
}
