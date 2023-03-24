import {uid} from "uid";
import {useState} from "react";
import ContainerDiv from "../ContainerDiv";
import StyledButton from "../StyledButton";
import FormContainer from "../FormContainer";
import CalendarText from "../CalendarComponents/CalendarText";
import apiDelete from "../../apiServices/apiDelete";
import StyledParagraphNormal from "../StyledParagraphNormal";
import CalendarColoredDiv from "../CalendarComponents/CalendarColoredDiv";

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
  setFetchingStatus,
  ObjectId,
}) {
  const [dateSelected, setDateSelected] = useState(dateSelectedStart);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - lengthOfHeatmap);
  const lastXDays = data?.filter((date) => date.date >= startDate);

  function handleClick(dat) {
    setDateSelected(dat);
  }
  let selectedData = null;
  if (data) {
    selectedData = data
      ?.filter(
        (dat) => dat.date?.toDateString() === dateSelected?.toDateString()
      )
      .slice();
  }
  function handleDeleteClick(date) {
    const indexToDelete = data.findIndex((dat) => {
      return dat.date.toString() === date.toString();
    });
    if (indexToDelete != -1) {
      console.log(
        "indexToDelete",
        indexToDelete,
        "data[indexToDelete]._id",
        data[indexToDelete]._id,
        "data[indexToDelete]",
        data[indexToDelete]
      );
      apiDelete(data[indexToDelete]._id, setFetchingStatus);
      const newData = data.slice();
      newData.splice(indexToDelete, 1);
      setData(newData);
    }
  }

  function handleEditClick(selectedData) {
    const newEditMode = {editModeOn: true, selectedData};
    setEditMode(newEditMode);
    setSportSelected(selectedData.sportSelected);
    scrollTo(0, 0);
  }

  function handleNewEntryClick(selectedDat) {
    const randomDater = Math.floor(Math.random() * 6 * 60 * 60 * 1000);
    const randomDate = new Date(selectedDat - randomDater);
    addNewEntry(randomDate, ObjectId(), "", "", "", "", "strength");

    const newEditMode = {
      editModeOn: true,
      selectedData: {date: randomDate},
    };
    setEditMode(newEditMode);
    scrollTo(0, 0);
  }
  /* 
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
  } */

  return (
    <>
      <CalendarText>Calendar</CalendarText>
      <ContainerDiv aria-label="calendar">
        {heatmap.map((dat, index) => {
          return (
            <div key={dat} onClick={() => handleClick(dat)}>
              {CalendarColoredDiv(dat, index, lastXDays, dateSelected, heatmap)}
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
            : "Select a Date above"}
        </p>
        {dateSelected ? (
          <StyledButton
            onClick={() => {
              handleNewEntryClick(dateSelected);
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
            <StyledParagraphNormal>
              Type: {selectedDat.sportSelected}
            </StyledParagraphNormal>

            {selectedDat.sportSelected === "strength" ? (
              <>
                <StyledParagraphNormal>
                  Exercise: {selectedDat.exerciseStrength}
                </StyledParagraphNormal>
                <StyledParagraphNormal>
                  Reps: {selectedDat.reps}
                </StyledParagraphNormal>
                <StyledParagraphNormal>
                  Sets: {selectedDat.sets}
                </StyledParagraphNormal>
                <StyledParagraphNormal>
                  Kilograms: {selectedDat.kilos}
                </StyledParagraphNormal>
              </>
            ) : (
              <>
                <StyledParagraphNormal>
                  Exercise: {selectedDat.exerciseRunning}
                </StyledParagraphNormal>
                <StyledParagraphNormal>
                  Kilometers: {selectedDat.kiloms}
                </StyledParagraphNormal>
                <StyledParagraphNormal>
                  Minutes: {selectedDat.mins}
                </StyledParagraphNormal>
              </>
            )}
            <StyledButton onClick={() => handleDeleteClick(selectedDat.date)}>
              Delete
            </StyledButton>
            <StyledButton onClick={() => handleEditClick(selectedDat)}>
              Edit
            </StyledButton>
          </FormContainer>
        );
      })}
    </>
  );
}
