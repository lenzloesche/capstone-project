import Heatmap from "../components/Heatmap";
const data = [{ year: 2023, month: 2, date: 15 }];
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
  let day = weekday[date.getDay()];

  function handleSubmit(event) {
    event.preventDefault();
    const save = {
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      reps: event.target.elements.reps.value,
      sets: event.target.elements.sets.value,
      kilos: event.target.elements.kilos.value,
    };
    pushIntoData(save);
  }

  function pushIntoData(objectToPush) {
    const doublePostIndex = data.findIndex(
      (dat) =>
        dat.date === objectToPush.date &&
        dat.month === objectToPush.month &&
        dat.year === objectToPush.year
    );
    if (doublePostIndex > -1) {
      data.splice(doublePostIndex, 1);
      data.push(objectToPush);
    } else {
      data.push(objectToPush);
    }
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
