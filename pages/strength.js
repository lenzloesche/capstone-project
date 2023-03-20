import { useState, useEffect } from "react";
import Header from "../components/Header";
import { uid } from "uid";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import StyledButton from "../components/StyledButton";

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

  return (
    <>
      {" "}
      <Header>Fitness App</Header>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchData("?name=" + searchInput);
        }}
      >
        <Input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        ></Input>
      </form>
      {data?.map((dat, index) => {
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
      })}
    </>
  );
}
