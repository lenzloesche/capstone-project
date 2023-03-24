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

export default function Strength({userName}) {
  const [data, SetData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [showDetails, setShowDetails] = useState(showDetailsStart);
  const [fetchingStatus, setFetchingStatus] = useState("none");

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
      SetData,
      resetDetails
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
        />
        {data?.length === 0 ? (
          <p>No Results</p>
        ) : (
          data?.map((dat, index) => {
            return (
              <FormContainer key={uid()}>
                <p>Name: {dat?.name}</p>
                <StyledButton
                  onClick={() => {
                    handleDetailsClick(index);
                  }}
                >
                  {showDetails[index] ? "Hide" : "Show"} Details
                </StyledButton>
                {showDetails[index] ? (
                  <>
                    <p>Difficulty: {dat?.difficulty}</p>
                    <p>Muslce: {dat?.muscle}</p>
                    <p>Type: {dat?.type}</p>
                    <p>Equipment: {dat?.equipment}</p>
                    <p>Instructions: {dat?.instructions}</p>
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