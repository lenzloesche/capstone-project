import Heatmap from "../components/Heatmap";
const data = [1, 0, 0, 0, 0, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 0, 0, 6, 6];
export default function Strength() {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date();
  console.log(date);
  let day = weekday[date.getDay()];
  return (
    <>
      <h1>Yet Another Fitness App</h1>
      <p>Today is {day}</p>
      <form>
        <label htmlFor="kilo">
          How many kilograms?
          <input id="kilo" typ="text"></input>
        </label>
        <br />
        <label htmlFor="reps">
          How many reps?
          <input id="reps" typ="text"></input>
        </label>
        <br />
        <label htmlFor="sets">
          How many sets?
          <input id="sets" typ="text"></input>
        </label>
        <br />
        <button>Done</button>
      </form>
      <Heatmap data={data} />
    </>
  );
}
