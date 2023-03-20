import { useState, useEffect } from "react";
import Header from "../components/Header";

const apiKey = "/N+lgsT1Ci9aZ5EnpUlNFA==jE3hMgeWrU1Jd0q0";
const url = "https://api.api-ninjas.com/v1/exercises";

export default function Strength() {
  const [data, SetData] = useState([]);
  async function fetchData() {
    try {
      const response = await fetch(url, {
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
    fetchData();
  }, []);

  return (
    <>
      {" "}
      <Header>Fitness App</Header>
      <input></input>
      <p>{data[0]?.name}</p>
    </>
  );
}
