import {uid} from "uid";
import ContainerDiv from "../ContainerDiv";
import StyledButton from "../StyledButton";
import FormContainer from "../FormContainer";
import CalendarText from "../CalendarComponents/CalendarText";
import apiDelete from "../../apiServices/apiDelete";
import StyledParagraphNormal from "../StyledParagraphNormal";
import CalendarColoredDiv from "../CalendarComponents/CalendarColoredDiv";
import {useState} from "react";
import {useEffect} from "react";

const date = new Date();

const lengthOfHeatmap = 70;

export default function CalendarHeatmap({
  data,
  setData,
  editMode,
  setEditMode,
  addNewEntry,
  setSportSelected,
  setFetchingStatus,
  ObjectId,
  dateSelected,
  setDateSelected,
  setGraphIsVisible,
}) {
  const newStartDate = new Date(date - lengthOfHeatmap);
  const [startDate, setStartDate] = useState(newStartDate);
  const [heatmap, setHeatmap] = useState([]);

  const [lastXDays, setLastXDays] = useState([]);
  useEffect(() => {
    changeHeatmap(date);
  }, []);

  function changeHeatmap(startingDate) {
    const newHeatmap = [];
    for (let day = 0; day < lengthOfHeatmap; day++) {
      const dayInMilliseconds = day * 24 * 60 * 60 * 1000;
      newHeatmap.unshift(new Date(startingDate - dayInMilliseconds));
    }

    setHeatmap(newHeatmap);

    const dayInMilliseconds = lengthOfHeatmap * 24 * 60 * 60 * 1000;

    const newLastXDays = data?.filter(
      (date) => startingDate >= startingDate - dayInMilliseconds
    );
    setLastXDays(newLastXDays);
  }

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
      apiDelete(data[indexToDelete]._id, setFetchingStatus);
      const newData = data.slice();
      newData.splice(indexToDelete, 1);
      setData(newData);
      const newEditMode = {...editMode, editModeOn: false};
      setEditMode(newEditMode);
    }
  }

  function handleEditClick(selectedData) {
    const newEditMode = {editModeOn: true, selectedData};
    setEditMode(newEditMode);
    setSportSelected(selectedData.sportSelected);
    setGraphIsVisible(false);
    scrollTo(0, 0);
  }

  function handleNewEntryClick(selectedDat) {
    const randomDater = Math.floor(Math.random() * 6 * 60 * 60 * 1000);
    const randomDate = new Date(selectedDat - randomDater);
    addNewEntry(randomDate, ObjectId(), "0", "0", "0", "Exercise", "strength");

    const newEditMode = {
      editModeOn: true,
      selectedData: {date: randomDate},
    };
    setEditMode(newEditMode);

    setGraphIsVisible(false);
    scrollTo(0, 0);
  }

  if (!data || heatmap.length === 0) {
    return <StyledParagraphNormal>Loading...</StyledParagraphNormal>;
  }
  function handleChangeDateCLick(changeWhere) {
    const dayInMilliseconds = changeWhere * 24 * 60 * 60 * 1000;
    const newStartDate = new Date(startDate.getTime() + dayInMilliseconds);
    setStartDate(newStartDate);
    changeHeatmap(newStartDate);
  }
  return (
    <>
      <CalendarText>
        <StyledButton
          onClick={() => {
            handleChangeDateCLick(-70);
          }}
        >
          {"<<"}
        </StyledButton>
        <StyledButton
          onClick={() => {
            handleChangeDateCLick(-7);
          }}
        >
          {"<"}
        </StyledButton>
        Calendar
        <StyledButton
          onClick={() => {
            handleChangeDateCLick(+7);
          }}
        >
          {">"}
        </StyledButton>
        <StyledButton
          onClick={() => {
            handleChangeDateCLick(+70);
          }}
        >
          {">>"}
        </StyledButton>
      </CalendarText>
      <ContainerDiv aria-label="calendar">
        {heatmap.map((dat, index) => {
          return (
            <div key={dat} onClick={() => handleClick(dat)}>
              <CalendarColoredDiv
                dat={dat}
                heatmapPosition={index}
                lastXDays={lastXDays}
                dateSelected={dateSelected}
                heatmap={heatmap}
              />
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
      {selectedData.map((selectedDat) => {
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
