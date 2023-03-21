import { uid } from "uid";
import { useState } from "react";
import ContainerDiv from "../ContainerDiv";
import StyledButton from "../StyledButton";
import FormContainer from "../FormContainer";
import CalendarText from "../CalendarText";
import Div from "../CalendarComponents/Div";

const date = new Date();
const heatmap = [];
const lengthOfHeatmap = 70;

for (let day = 0; day < lengthOfHeatmap; day++) {
  const dayInMilliseconds = day * 24 * 60 * 60 * 1000;
  heatmap.unshift(new Date(date - dayInMilliseconds));
}

let dateSelectedStart = undefined;

export default function CalendarHeatmap({
  data,
  setData,
  setEditMode,
  addNewEntry,
  setSportSelected,
}) {
  const [dateSelected, setDateSelected] = useState(dateSelectedStart);
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
          <Div color="#a3b6e6" isSelected>
            {dat.getMonth() + 1 + "/" + dat.getDate()}
          </Div>
        );
      }
      return (
        <Div color="#a3b6e6">{dat.getMonth() + 1 + "/" + dat.getDate()}</Div>
      );
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
          <Div color="#d93f45" isSelected>
            {dat.getMonth() + 1 + "/" + dat.getDate()}
          </Div>
        );
      }
      return (
        <Div color="#d93f45">{dat.getMonth() + 1 + "/" + dat.getDate()}</Div>
      );
    }
    if (filterRunning) {
      if (dateSelected === dat) {
        return (
          <Div color="#f89348" isSelected>
            {dat.getMonth() + 1 + "/" + dat.getDate()}
          </Div>
        );
      }
      return (
        <Div color="#f89348">{dat.getMonth() + 1 + "/" + dat.getDate()}</Div>
      );
    }
    if (filterStrength) {
      if (dateSelected === dat) {
        return (
          <Div color="#d96a3f" isSelected>
            {dat.getMonth() + 1 + "/" + dat.getDate()}
          </Div>
        );
      }
      return (
        <Div color="#d96a3f">{dat.getMonth() + 1 + "/" + dat.getDate()}</Div>
      );
    }
    if (dateSelected === dat) {
      return (
        <Div color="#a3b6e6" isSelected>
          {dat.getMonth() + 1 + "/" + dat.getDate()}
        </Div>
      );
    }
    return (
      <Div color="#a3b6e6">{dat.getMonth() + 1 + "/" + dat.getDate()}</Div>
    );
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
            New for selected Date
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
                Exercise: {selectedDat.exerciseStrength}
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
                Exercise: {selectedDat.exerciseRunning}
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
