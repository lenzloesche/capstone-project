import { useState, useEffect } from "react";
import Header from "../components/Header";
import { uid } from "uid";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import StyledButton from "../components/StyledButton";
import Heading from "../components/Heading";
import StrengthContainer from "../components/StrengthContainer";
import Image from "next/image";
import StyledSelect from "../components/StyledSelect";
import Navigation from "../components/Navigation";
import StyledParagraph from "../components/StyledParagraph";
import fetchStrength from "../apiServices/fetchStrength";

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

export default function Strength() {
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
        {" "}
        <Header>
          <Heading>Fitness App</Heading>
        </Header>
        <FormContainer>
          <Image
            className="border"
            src="/strength.svg"
            alt="strength image of an Arm"
            width="100"
            height="100"
          ></Image>
          <h2>Exercise Search</h2>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <Input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            ></Input>
            <p>Filter:</p>
            <StyledSelect id="type" name="type">
              <option value="all_types">all types</option>
              <option value="cardio">cardio</option>
              <option value="olympic_weightlifting">
                olympic_weightlifting
              </option>
              <option value="plyometrics">plyometrics</option>
              <option value="powerlifting">powerlifting</option>
              <option value="strength">strength</option>
              <option value="stretching">stretching</option>
              <option value="strongman">strongman</option>
            </StyledSelect>
            <br />
            <StyledSelect id="difficulty" name="difficulty">
              <option value="all_difficulties">all difficulties</option>
              <option value="beginner">beginner</option>
              <option value="intermediate">intermediate</option>
              <option value="expert">expert</option>
            </StyledSelect>
            <br />
            <StyledSelect id="muscle" name="muscle">
              <option value="all_muscles">all muscles</option>
              <option value="abdominals">abdominals</option>
              <option value="abductors">abductors</option>
              <option value="adductors">adductors</option>
              <option value="biceps">biceps</option>
              <option value="calves">calves</option>
              <option value="chest">chest</option>
              <option value="forearms">forearms</option>
              <option value="glutes">glutes</option>
              <option value="hamstrings">hamstrings</option>
              <option value="lats">lats</option>
              <option value="lower_back">lower_back</option>
              <option value="middle_back">middle_back</option>
              <option value="neck">neck</option>
              <option value="quadriceps">quadriceps</option>
              <option value="traps">traps</option>
              <option value="triceps">triceps</option>
            </StyledSelect>
          </form>
        </FormContainer>
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
      <Navigation selected={"strength"}>
        {" "}
        <StyledParagraph isError={fetchingStatus === "Error" ? true : false}>
          Info: {fetchingStatus}
        </StyledParagraph>
      </Navigation>
    </>
  );
}
