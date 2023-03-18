import Heatmap from "../components/Heatmap";
import { useState } from "react";

let date = new Date();
const startingData = [];

export default function Strength() {
  const [data, setData] = useState(startingData);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = weekday[date.getDay()];

  function handleSubmit(event) {
    event.preventDefault();
    date = new Date();
    const save = {
      date: date,
      reps: event.target.elements.reps.value,
      sets: event.target.elements.sets.value,
      kilos: event.target.elements.kilos.value,
      exercise: event.target.elements.exercise.value,
    };

    const newData = data.slice();
    newData.push(save);
    setData(newData);
  }

  return (
    <>
      <h1>Yet Another Fitness App</h1>
      <p>Today is {day}</p>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label htmlFor="exercise">
          Which exercise?
          <input id="exercise" type="text" required></input>
        </label>
        <br />
        <label htmlFor="kilos">
          How many kilograms?
          <input id="kilos" type="number" required></input>
        </label>
        <br />
        <label htmlFor="reps">
          How many reps?
          <input id="reps" type="number" required></input>
        </label>
        <br />
        <label htmlFor="sets">
          How many sets?
          <input id="sets" type="number" required></input>
        </label>
        <br />
        <button type="submit">Done</button>
      </form>
      <Heatmap data={data} setData={setData} />
    </>
  );
}
