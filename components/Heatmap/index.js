import styled from "styled-components";
import { uid } from "uid";
import { useState } from "react";
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
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - lengthOfHeatmap);
  const lastXDays = data?.filter((date) => date.date >= startDate);

  function handleClick(event, dat) {
    setDateSelected(dat);
  }
  const selectedData = data
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
      {selectedData.map((selectedDat) => {
        return (
          <p key={uid()}>
            {selectedDat ? "Exercise: " + selectedDat?.exercise : ""}
            <br />
            {selectedDat ? "Reps: " + selectedDat?.reps : ""}
            <br />
            {selectedDat ? "Sets: " + selectedDat?.sets : ""}
            <br />
            {selectedDat ? "Kilograms: " + selectedDat?.kilos : ""}
            <br />
            <button
              onClick={(event) => handleDeleteClick(event, selectedDat.date)}
            >
              Delete
            </button>
          </p>
        );
      })}
    </>
  );
}
