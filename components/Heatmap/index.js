import { uid } from "uid";
import { useState } from "react";
import ContainerDiv from "../ContainerDiv";

import StyledButton from "../StyledButton";

import FormContainer from "../FormContainer";
import CalendarText from "../CalendarText";
import DivColor0 from "../CalendarComponents/DivColor0";
import DivColor0Selected from "../CalendarComponents/DivColor0Selected";
import DivColor1 from "../CalendarComponents/DivColor1";
import DivColor1Selected from "../CalendarComponents/DivColor1Selected";
import DivColor2 from "../CalendarComponents/DivColor2";
import DivColor2Selected from "../CalendarComponents/DivColor2Selected";
import DivColor3 from "../CalendarComponents/DivColor3";
import DivColor3Selected from "../CalendarComponents/DivColor3Selected";

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
  setSportSelected,
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
    setSportSelected(selectedDate.sportSelected);
    scrollTo(0, 0);
  }

  function handleNewEntryClick(event, selectedDat) {
    const randomDater = Math.floor(Math.random() * 6 * 60 * 60 * 1000);
    const randomDate = new Date(selectedDat - randomDater);
    addNewEntry(randomDate, "", "", "", "", "strength");

    const newEditMode = {
      editModeOn: true,
      selectedData: { date: randomDate },
    };
    setEditMode(newEditMode);
    scrollTo(0, 0);
  }

  function PaintDiv(dat, heatmapPosition) {
    const allEntries = lastXDays.filter(
      (lastDay) =>
        heatmap[heatmapPosition].toDateString() === lastDay.date.toDateString()
    );
    if (allEntries.length === 0) {
      if (dateSelected === dat) {
        return (
          <DivColor0Selected>
            {dat.getMonth() + 1 + "/" + dat.getDate()}
          </DivColor0Selected>
        );
      }
      return <DivColor0>{dat.getMonth() + 1 + "/" + dat.getDate()}</DivColor0>;
    }

    const filterRunning = allEntries.find((entry) => {
      return entry.sportSelected === "running";
    });
    const filterStrength = allEntries.find((entry) => {
      return entry.sportSelected === "strength";
    });

    if (filterRunning && filterStrength) {
      if (dateSelected === dat) {
        return (
          <DivColor2Selected>
            {dat.getMonth() + 1 + "/" + dat.getDate()}
          </DivColor2Selected>
        );
      }
      return <DivColor2>{dat.getMonth() + 1 + "/" + dat.getDate()}</DivColor2>;
    }
    if (filterRunning) {
      if (dateSelected === dat) {
        return (
          <DivColor1Selected>
            {dat.getMonth() + 1 + "/" + dat.getDate()}
          </DivColor1Selected>
        );
      }
      return <DivColor1>{dat.getMonth() + 1 + "/" + dat.getDate()}</DivColor1>;
    }
    if (filterStrength) {
      if (dateSelected === dat) {
        return (
          <DivColor3Selected>
            {dat.getMonth() + 1 + "/" + dat.getDate()}
          </DivColor3Selected>
        );
      }
      return <DivColor3>{dat.getMonth() + 1 + "/" + dat.getDate()}</DivColor3>;
    }
    if (dateSelected === dat) {
      return (
        <DivColor0Selected>
          {dat.getMonth() + 1 + "/" + dat.getDate()}
        </DivColor0Selected>
      );
    }
    return <DivColor0>{dat.getMonth() + 1 + "/" + dat.getDate()}</DivColor0>;
  }
  return (
    <>
      {" "}
      <CalendarText>Calendar</CalendarText>
      <ContainerDiv aria-label="calendar">
        {heatmap.map((dat, index) => {
          return (
            <div key={dat} onClick={(event) => handleClick(event, dat)}>
              {PaintDiv(dat, index)}
            </div>
          );
        })}
      </ContainerDiv>
      <FormContainer>
        <p>
          {dateSelected
            ? "Date Selected: " +
              (dateSelected.getMonth() + 1).toString() +
              "/" +
              dateSelected.getDate().toString() +
              "/" +
              dateSelected.getFullYear().toString()
            : "Select a Date"}
        </p>
        {dateSelected ? (
          <StyledButton
            onClick={(event) => {
              handleNewEntryClick(event, dateSelected);
            }}
          >
            New
          </StyledButton>
        ) : (
          ""
        )}
      </FormContainer>
      {selectedData.map((selectedDat, index) => {
        return (
          <FormContainer key={uid()}>
            {" "}
            <br />
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
          </FormContainer>
        );
      })}
    </>
  );
}
