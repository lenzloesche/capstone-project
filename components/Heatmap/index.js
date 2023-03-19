import { uid } from "uid";
import { useState } from "react";
import ContainerDiv from "../ContainerDiv";
import Div from "../Div";
import RedDiv from "../RedDiv";
import RedDivSelected from "../RedDivSelected";
import DivSelected from "../DivSelected";
import StyledButton from "../StyledButton";
import GreenDiv from "../GreenDiv";
import GreenDivSelected from "../GreenDivSelected";
import BlueDiv from "../BlueDiv";
import BlueDivSelected from "../BlueDivSelected";

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
    ?.filter((dat) => dat.date?.toDateString() === dateSelected?.toDateString())
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
    addNewEntry(selectedDat, "", "", "", "");

    const newEditMode = {
      editModeOn: true,
      selectedData: { date: selectedDat },
    };
    setEditMode(newEditMode);
  }

  function PaintDiv(dat, heatmapPosition) {
    const allEntries = lastXDays.filter(
      (lastDay) =>
        heatmap[heatmapPosition].toDateString() === lastDay.date.toDateString()
    );
    if (allEntries.length === 0) {
      if (dateSelected === dat) {
        return <DivSelected>{dat.getDate()}</DivSelected>;
      }
      return <Div></Div>;
    }

    const filterRunning = allEntries.find((entry) => {
      return entry.sportSelected === "running";
    });
    const filterStrength = allEntries.find((entry) => {
      return entry.sportSelected === "strength";
    });

    if (filterRunning && filterStrength) {
      if (dateSelected === dat) {
        return <GreenDivSelected>{dat.getDate()}</GreenDivSelected>;
      }
      return <GreenDiv></GreenDiv>;
    }
    if (filterRunning) {
      if (dateSelected === dat) {
        return <BlueDivSelected>{dat.getDate()}</BlueDivSelected>;
      }
      return <BlueDiv></BlueDiv>;
    }
    if (filterStrength) {
      if (dateSelected === dat) {
        return <RedDivSelected>{dat.getDate()}</RedDivSelected>;
      }
      return <RedDiv></RedDiv>;
    }
    if (dateSelected === dat) {
      return <DivSelected>{dat.getDate()}</DivSelected>;
    }
    return <Div></Div>;
  }
  return (
    <>
      <ContainerDiv>
        {heatmap.map((dat, index) => {
          return (
            <div key={dat} onClick={(event) => handleClick(event, dat)}>
              {PaintDiv(dat, index)}
            </div>
          );
        })}
      </ContainerDiv>

      <p>
        {dateSelected
          ? "Date Selected:" + dateSelected.toString()
          : "Select a Date"}
      </p>
      <StyledButton
        onClick={(event) => {
          handleNewEntryClick(event, dateSelected);
        }}
      >
        New
      </StyledButton>
      {selectedData.map((selectedDat, index) => {
        return (
          <p key={uid()}>
            Type: {selectedDat.sportSelected}
            <br />
            {selectedDat.sportSelected === "strength" ? (
              <>
                Exercise: {selectedDat.exercise}
                <br />
                Reps: {selectedDat.reps}
                <br />
                Sets: {selectedDat.sets}
                <br />
                Kilograms: {selectedDat.kilos}
                <br />
              </>
            ) : (
              <>
                Exercise: {selectedDat.exercise}
                <br />
                Kilometers: {selectedDat.kiloms}
                <br />
                Minutes: {selectedDat.mins}
                <br />
              </>
            )}
            <StyledButton
              onClick={(event) => handleDeleteClick(event, selectedDat.date)}
            >
              Delete
            </StyledButton>
            <StyledButton
              onClick={(event) => handleEditClick(event, selectedDat)}
            >
              {" "}
              Edit
            </StyledButton>
          </p>
        );
      })}
    </>
  );
}
