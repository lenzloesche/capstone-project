import {useState, useEffect} from "react";
import Header from "../components/Header";
import {uid} from "uid";
import Heading from "../components/Heading";
import StrengthContainer from "../components/StrengthContainer";
import Navigation from "../components/Navigation";
import StyledParagraph from "../components/StyledParagraph";
import fetchStrength from "../apiServices/fetchStrength";
import StrengthSearchForm from "../components/StrengthSearchForm";
import NavigationLink from "../components/NavigationLink";
import ExerciseDisplayed from "../components/ExerciseDisplayed";
import apiPostFavorite from "../apiServices/apiPostFavorite";
import apiGetFavorite from "../apiServices/apiGetFavorite";
import apiDeleteFavorite from "../apiServices/apiDeleteFavorite";

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

export default function ExerciseSearch({
  userName,
  favoriteExercises,
  setFavoriteExercises,
  fetchingStatus,
  setFetchingStatus,
}) {
  const [data, setData] = useState([]);
  const [dataWithFavorites, setDataWithFavorites] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [showDetails, setShowDetails] = useState(showDetailsStart);
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
    dat.isFavorite = true;
    dat.user = userName;
    if (favoriteExercises.length === 0) {
      apiPostFavorite(dat, setFetchingStatus);

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
        apiDeleteFavorite(userName, dat.name, setFetchingStatus);
      } else {
        apiPostFavorite(dat, setFetchingStatus);
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
            {favoriteExercises.map((favoriteExercise, index) => {
              return (
                <ExerciseDisplayed
                  showFavorites={showFavorites}
                  key={uid()}
                  dat={favoriteExercise}
                  handleFavoriteClick={handleFavoriteClick}
                  handleDetailsClick={handleDetailsClick}
                  showDetails={showDetails}
                  index={index}
                />
              );
            })}{" "}
          </>
        ) : data?.length === 0 ? (
          <p>No Results</p>
        ) : (
          dataWithFavorites?.map((dat, index) => {
            return (
              <ExerciseDisplayed
                showFavorites={showFavorites}
                key={uid()}
                dat={dat}
                handleFavoriteClick={handleFavoriteClick}
                handleDetailsClick={handleDetailsClick}
                showDetails={showDetails}
                index={index}
              />
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
