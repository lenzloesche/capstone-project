import Heatmap from "../components/Heatmap";
import { useState } from "react";

const date = new Date();
const dayInMilliseconds = 24 * 60 * 60 * 1000;
const startingData = [];
for (let day = 0; day < 100; day++) {
  const randomNumber = day * Math.random() * 100;
  startingData.push({
    date: new Date(date - randomNumber * dayInMilliseconds),
  });
}

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
    const save = {
      date: date,
      reps: event.target.elements.reps.value,
      sets: event.target.elements.sets.value,
      kilos: event.target.elements.kilos.value,
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
        <label htmlFor="sets">How many sets?</label>
        <input id="sets" type="number" required></input>

        <br />
        <button type="submit">Done</button>
      </form>
      <Heatmap data={data} />
    </>
  );
}
