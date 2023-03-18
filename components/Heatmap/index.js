import styled from "styled-components";
import { uid } from "uid";
import { useState } from "react";
const Div = styled.div`
  background-color: white;
  border: 1px solid black;
  height: 20px;
  width: 20px;
  margin: 1px;
`;

const RedDiv = styled.div`
  background-color: red;
  border: 1px solid black;
  height: 20px;
  width: 20px;
  margin: 1px;
`;

const ContainerDiv = styled.div`
  display: grid;
  justify-content: center;
  grid-template-rows: repeat(7, 1fr);
  grid-auto-flow: column;
`;

const RightAlignText = styled.p`
  text-align: right;
`;

const SmallContainer = styled.div`
  width: 240px;
`;
const date = new Date();
const heatmap = [];
const lengthOfHeatmap = 105;

for (let day = 0; day < lengthOfHeatmap; day++) {
  const dayInMilliseconds = day * 24 * 60 * 60 * 1000;
  heatmap.unshift(new Date(date - dayInMilliseconds));
}

let dateSelectedStart = -1;

export default function Heatmap({ data }) {
  const [dateSelected, setDateSelected] = useState(dateSelectedStart);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - lengthOfHeatmap);
  const lastXDays = data?.filter((date) => date.date >= startDate);

  function handleClick(event, dat) {
    setDateSelected(dat);
  }
  const selectedData = data.filter(
    (dat) => dat.date.toDateString() === dateSelected.toDateString()
  );
  console.log(selectedData);
  return (
    <>
      <SmallContainer>
        <ContainerDiv>
          {heatmap.map((dat) => {
            return (
              <div key={dat} onClick={(event) => handleClick(event, dat)}>
                {lastXDays.some(
                  (lastDay) =>
                    dat.toDateString() === lastDay.date.toDateString()
                ) ? (
                  <RedDiv>{dat.getDate()}</RedDiv>
                ) : (
                  <Div>{dat.getDate()}</Div>
                )}
              </div>
            );
          })}
        </ContainerDiv>

        <RightAlignText>-Today-</RightAlignText>
        <p>
          {dateSelected != -1
            ? "Date Selected:" + dateSelected.toString()
            : "Select a Date"}
        </p>
        <br />
        {selectedData.map((selectedDat) => {
          return (
            <>
              <p>{selectedDat ? "Reps: " + selectedDat?.reps : ""}</p>
              <p>{selectedDat ? "Sets: " + selectedDat?.sets : ""}</p>
              <p>{selectedDat ? "Kilograms: " + selectedDat?.kilos : ""}</p>
            </>
          );
        })}
      </SmallContainer>
    </>
  );
}
