import { uid } from "uid";
import { useState } from "react";
import ContainerDiv from "../ContainerDiv";
import Div from "../Div";
import RedDiv from "../RedDiv";
import RedDivSelected from "../RedDiSelected";
import DivSelected from "../DivSelected";

const date = new Date();
const heatmap = [];
const lengthOfHeatmap = 70;

for (let day = 0; day < lengthOfHeatmap; day++) {
  const dayInMilliseconds = day * 24 * 60 * 60 * 1000;
  heatmap.unshift(new Date(date - dayInMilliseconds));
}

let dateSelectedStart = undefined;

export default function Heatmap({
  data,
  setData,
  editMode,
  setEditMode,
  addNewEntry,
}) {
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

  function handleEditClick(event, selectedDate) {
    const newEditMode = { editModeOn: true, selectedData: selectedDate };
    setEditMode(newEditMode);
  }

  function handleNewEntryClick(event, selectedDat) {
    console.log(selectedDat);
    addNewEntry(selectedDat, "", "", "", "");

    const newEditMode = {
      editModeOn: true,
      selectedData: { date: selectedDat },
    };
    setEditMode(newEditMode);
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
                <>
                  {dateSelected === dat ? (
                    <RedDivSelected>{dat.getDate()}</RedDivSelected>
                  ) : (
                    <RedDiv>{dat.getDate()}</RedDiv>
                  )}
                </>
              ) : (
                <>
                  {dateSelected === dat ? (
                    <DivSelected>{dat.getDate()}</DivSelected>
                  ) : (
                    <Div>{dat.getDate()}</Div>
                  )}
                </>
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
      <button
        onClick={(event) => {
          handleNewEntryClick(event, dateSelected);
        }}
      >
        New Entry
      </button>
      {selectedData.map((selectedDat, index) => {
        return (
          <p key={uid()}>
            Exercise: {selectedDat.exercise}
            <br />
            Reps: {selectedDat.reps}
            <br />
            Sets: {selectedDat.sets}
            <br />
            Kilograms: {selectedDat.kilos}
            <br />
            <button
              onClick={(event) => handleDeleteClick(event, selectedDat.date)}
            >
              Delete
            </button>
            <button onClick={(event) => handleEditClick(event, selectedDat)}>
              {" "}
              Edit
            </button>
          </p>
        );
      })}
    </>
  );
}
