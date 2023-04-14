import {useState, useEffect} from "react";
import {uid} from "uid";
import StrengthContainer from "../components/StrengthContainer";
import Navigation from "../components/Navigation";
import fetchStrength from "../apiServices/fetchStrength";
import StrengthSearchForm from "../components/StrengthSearchForm";
import NavigationLink from "../components/NavigationLink";
import ExerciseDisplayed from "../components/ExerciseDisplayed";
import apiPostFavorite from "../apiServices/apiPostFavorite";
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

  async function handleSubmit(event) {
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

    try {
      const data = await fetchStrength("?name=" + searchInput + apiString);
      setData(data);
      resetDetails();
    } catch (error) {
      console.error(error);
    }
  }

  function handleFavoriteClick(singleData) {
    singleData.isFavorite = true;
    singleData.user = userName;
    if (favoriteExercises.length === 0) {
      apiPostFavorite(singleData);

      setFavoriteExercises([singleData]);
    } else {
      const alreadyExistsAtIndex = favoriteExercises.findIndex(
        (favoriteExercise) => {
          return favoriteExercise.name === singleData.name;
        }
      );
      if (alreadyExistsAtIndex != -1) {
        const newfavoriteExercises = favoriteExercises.slice();
        newfavoriteExercises.splice(alreadyExistsAtIndex, 1);
        setFavoriteExercises(newfavoriteExercises);
        apiDeleteFavorite(userName, singleData.name);
      } else {
        apiPostFavorite(singleData);
        setFavoriteExercises([singleData, ...favoriteExercises]);
      }
    }
  }

  function handleShowFavoritesClick() {
    setShowDetails(showDetailsStart);
    setShowFavorites(true);
  }
  function handleShowSearchClick() {
    setShowDetails(showDetailsStart);
    setShowFavorites(false);
  }

  useEffect(() => {
    let newData = data.slice();
    newData = newData.map((singleData) => {
      let isFavorite = favoriteExercises.find((favoriteExercise) => {
        return singleData.name === favoriteExercise.name;
      });
      isFavorite ? (isFavorite = true) : (isFavorite = false);
      return {...singleData, isFavorite: isFavorite};
    });
    setDataWithFavorites(newData);
  }, [data, favoriteExercises]);

  if (userName === "DontRender") {
    return (
      <>
        <StrengthContainer>
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
            {favoriteExercises?.map((favoriteExercise, index) => {
              return (
                <ExerciseDisplayed
                  showFavorites={showFavorites}
                  key={uid()}
                  singleData={favoriteExercise}
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
          dataWithFavorites?.map((singleData, index) => {
            return (
              <ExerciseDisplayed
                showFavorites={showFavorites}
                key={uid()}
                singleData={singleData}
                handleFavoriteClick={handleFavoriteClick}
                handleDetailsClick={handleDetailsClick}
                showDetails={showDetails}
                index={index}
              />
            );
          })
        )}
      </StrengthContainer>
      <Navigation selected={"exerciseSearch"} userName={userName} />
    </>
  );
}
