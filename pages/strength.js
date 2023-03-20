import { useState, useEffect } from "react";
import Header from "../components/Header";
import { uid } from "uid";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import StyledButton from "../components/StyledButton";
import Heading from "../components/Heading";
import StrengthContainer from "../components/StrengthContainer";
import Image from "next/image";

const apiKey = "/N+lgsT1Ci9aZ5EnpUlNFA==jE3hMgeWrU1Jd0q0";
const url = "https://api.api-ninjas.com/v1/exercises";
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
  async function fetchData(input) {
    try {
      const response = await fetch(url + input, {
        headers: {
          "x-api-key": apiKey,
        },
      });
      if (response.ok) {
        const dataFetch = await response.json();
        SetData(dataFetch);
        resetDetails();
        console.log(data);
      } else {
        console.log("Response not OK.");
      }
    } catch (error) {
      console.log("Error fetching: ", error);
    }
  }

  useEffect(() => {
    fetchData("");
  }, []);

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
    fetchData("?name=" + searchInput + apiString);
  }

  return (
    <StrengthContainer>
      {" "}
      <Header>
        <Heading>Fitness App</Heading>
      </Header>
      <FormContainer>
        <Image
          className="small-border"
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
          <br />
          <select id="type" name="type">
            <option value="all_types">all types</option>
            <option value="cardio">cardio</option>
            <option value="olympic_weightlifting">olympic_weightlifting</option>
            <option value="plyometrics">plyometrics</option>
            <option value="powerlifting">powerlifting</option>
            <option value="strength">strength</option>
            <option value="stretching">stretching</option>
            <option value="strongman">strongman</option>
          </select>
          <br />
          <select id="difficulty" name="difficulty">
            <option value="all_difficulties">all difficulties</option>
            <option value="beginner">beginner</option>
            <option value="intermediate">intermediate</option>
            <option value="expert">expert</option>
          </select>
          <br />
          <select id="muscle" name="muscle">
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
          </select>
        </form>
      </FormContainer>
      {data.length === 0 ? (
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
  );
}
