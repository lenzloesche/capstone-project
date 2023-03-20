import { useState, useEffect } from "react";
import Header from "../components/Header";
import { uid } from "uid";
import FormContainer from "../components/FormContainer";

const apiKey = "/N+lgsT1Ci9aZ5EnpUlNFA==jE3hMgeWrU1Jd0q0";
const url = "https://api.api-ninjas.com/v1/exercises";

export default function Strength() {
  const [data, SetData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
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
        <input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        ></input>
      </form>
      {data?.map((dat) => {
        return (
          <FormContainer key={uid()}>
            <p>Name: {dat?.name}</p>
            <p>Difficulty: {dat?.difficulty}</p>
            <p>Muslce: {dat?.muscle}</p>
            <p>Type: {dat?.type}</p>
            <p>Equipment: {dat?.equipment}</p>
          </FormContainer>
        );
      })}
    </>
  );
}
