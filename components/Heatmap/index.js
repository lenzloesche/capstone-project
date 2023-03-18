import styled from "styled-components";
import { uid } from "uid";
import { useState } from "react";
import { useEffect } from "react";
const Div = styled.div`
  background-color: white;
  border: 1px solid black;
  height: 30px;
  width: 30px;
  margin: 1px;
`;

const RedDiv = styled.div`
  background-color: red;
  border: 1px solid black;
  height: 30px;
  width: 30px;
  margin: 1px;
`;

const ContainerDiv = styled.div`
  display: grid;
  justify-content: center;
  grid-template-rows: repeat(7, 1fr);
  grid-auto-flow: column;
`;

const date = new Date();
const heatmap = [];
const lengthOfHeatmap = 70;

for (let day = 0; day < lengthOfHeatmap; day++) {
  const dayInMilliseconds = day * 24 * 60 * 60 * 1000;
  heatmap.unshift(new Date(date - dayInMilliseconds));
}

let dateSelectedStart = undefined;

export default function Heatmap({ data, setData }) {
  const [dateSelected, setDateSelected] = useState(dateSelectedStart);
  const [editField, setEditField] = useState([{ exercise: "a" }]);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - lengthOfHeatmap);
  const lastXDays = data?.filter((date) => date.date >= startDate);

  function handleClick(event, dat) {
    setDateSelected(dat);
  }
  let selectedData = data
    .filter((dat) => dat.date.toDateString() === dateSelected?.toDateString())
    .slice();

  function handleDeleteClick(event, date) {
    const indexToDelete = data.findIndex((dat) => {
      return dat.date.toString() === date.toString();
    });
    if (indexToDelete != -1) {
      const newData = data.slice();
      newData.splice(indexToDelete, 1);
      setData(newData);
    }
  }

  function handleEditClick(event, date) {
    event.preventDefault();
    const indexToChange = data.findIndex((dat) => {
      return dat.date.toString() === date.toString();
    });
    if (indexToChange != -1) {
      const newData = data.slice();
      newData[indexToChange].exercise = event.target.elements.exercise.value;
      newData[indexToChange].reps = event.target.elements.reps.value;
      newData[indexToChange].sets = event.target.elements.sets.value;
      newData[indexToChange].kilos = event.target.elements.kilos.value;

      setData(newData);
    }
  }
  function handleChange(event, index, type) {
    const newEditField = [...editField];
    newEditField[index][type] = event.target.value;
    setEditField(newEditField);
    event.target.focus();
    console.log(index, newEditField);
  }

  return (
    <>
      <ContainerDiv>
        {heatmap.map((dat) => {
          return (
            <div key={dat} onClick={(event) => handleClick(event, dat)}>
              {lastXDays.some(
                (lastDay) => dat.toDateString() === lastDay.date.toDateString()
              ) ? (
                <RedDiv>{dat.getDate()}</RedDiv>
              ) : (
                <Div>{dat.getDate()}</Div>
              )}
            </div>
          );
        })}
      </ContainerDiv>

      <p>
        {dateSelected
          ? "Date Selected:" + dateSelected.toString()
          : "Select a Date"}
      </p>
      <br />
      {selectedData.map((selectedDat, index) => {
        return (
          <form
            key={uid()}
            onSubmit={(event) => {
              handleEditClick(event, selectedDat.date);
            }}
          >
            <label htmlFor="exercise">
              Exercise:
              <input
                id="exercise"
                type="text"
                value={editField[index]?.exercise}
                onChange={(event) => {
                  handleChange(event, index, "exercise");
                }}
                required
              ></input>
            </label>
            <br />
            <label htmlFor="reps">
              Reps:
              <input
                id="reps"
                type="number"
                value={editField[index]?.reps}
                onChange={(event) => {
                  handleChange(event, index, "reps");
                }}
                required
              ></input>
            </label>
            <br />
            <label htmlFor="sets">
              Sets:
              <input
                id="sets"
                type="number"
                value={editField[index]?.sets}
                onChange={(event) => {
                  handleChange(event, index, "sets");
                }}
                required
              ></input>
            </label>
            <br />
            <label htmlFor="kilos">
              Kilograms:
              <input
                id="kilos"
                type="number"
                value={editField[index]?.kilos}
                onChange={(event) => {
                  handleChange(event, index, "kilos");
                }}
                required
              ></input>
            </label>
            <br />
            <button
              onClick={(event) => handleDeleteClick(event, selectedDat.date)}
            >
              Delete
            </button>
            <button type="submit"> Edit</button>
          </form>
        );
      })}
    </>
  );
}
