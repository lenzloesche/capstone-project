import CalendarHeatmap from "../components/CalendarHeatmap";
import { useEffect, useState } from "react";
import StrengthForm from "../components/StrengthForm";
import StrengthContainer from "../components/StrengthContainer";
import Image from "next/image";
import ImageContainer from "../components/ImageContainer";
import RunningForm from "../components/RunningForm";
import Header from "../components/Header";
import Heading from "../components/Heading";
import FormContainer from "../components/FormContainer";

let date = new Date();
let startingData = [];

export default function Calendar() {
  const [data, setData] = useState(startingData);
  const [sportSelected, setSportSelected] = useState("strength");

  const [editMode, setEditMode] = useState({
    editModeOn: false,
    selectedData: "",
  });
  const [inputText, setInputText] = useState({
    exerciseStrength: "",
    kilograms: "",
    reps: "",
    sets: "",
    exerciseRunning: "",
    kiloms: "",
    mins: "",
  });
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekday[date.getDay()];

  function addNewEntryStrength(
    forDate,
    reps,
    sets,
    kilos,
    exercise,
    sportSelected
  ) {
    const NewDate = forDate;
    const save = {
      date: NewDate,
      sportSelected: sportSelected,
      reps: reps,
      sets: sets,
      kilos: kilos,
      exercise: exercise,
    };
    const newData = data.slice();
    newData.push(save);
    setData(newData);
  }

  function addNewEntryRunning(forDate, kiloms, mins, exercise, sportSelected) {
    const NewDate = forDate;
    const save = {
      date: NewDate,
      sportSelected: sportSelected,
      kiloms: kiloms,
      mins: mins,
      exercise: exercise,
    };
    const newData = data.slice();
    newData.push(save);
    setData(newData);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (editMode.editModeOn) {
      const NewDate = editMode.selectedData.date;
      let save = {};
      if (sportSelected === "strength") {
        save = {
          date: NewDate,
          sportSelected: sportSelected,
          reps: event.target.elements.reps.value,
          sets: event.target.elements.sets.value,
          kilos: event.target.elements.kilos.value,
          exercise: event.target.elements.exercise.value,
        };
      } else {
        save = {
          date: NewDate,
          sportSelected: sportSelected,
          kiloms: event.target.elements.kiloms.value,
          mins: event.target.elements.mins.value,
          exercise: event.target.elements.exercise.value,
        };
      }

      const newData = data.slice();
      const indexToChange = newData.findIndex((dat) => {
        return dat.date.toString() === editMode.selectedData.date.toString();
      });
      newData[indexToChange] = save;
      setData(newData);
      editMode.editModeOn = false;
    } else {
      if (sportSelected === "strength") {
        addNewEntryStrength(
          new Date(),
          event.target.elements.reps.value,
          event.target.elements.sets.value,
          event.target.elements.kilos.value,
          event.target.elements.exercise.value,
          sportSelected
        );
      } else {
        addNewEntryRunning(
          new Date(),
          event.target.elements.kiloms.value,
          event.target.elements.mins.value,
          event.target.elements.exercise.value,
          sportSelected
        );
      }
    }
    clearForm();
  }
  function handleCancelClick(event) {
    clearForm();
  }

  function clearForm() {
    const newEditMode = {
      editModeOn: false,
      selectedData: {
        exercise: "",
        kilos: "",
        reps: "",
        sets: "",
        kiloms: "",
        mins: "",
      },
    };
    newEditMode.editModeOn = false;
    setEditMode(newEditMode);
  }

  useEffect(() => {
    let newInputText = {};
    if (sportSelected === "strength") {
      newInputText.exerciseStrength = editMode.selectedData.exercise;
      newInputText.kilos = editMode.selectedData.kilos;
      newInputText.reps = editMode.selectedData.reps;
      newInputText.sets = editMode.selectedData.sets;

      /* newInputText = [
        exerciseStrengtheditMode.selectedData.exercise,
        editMode.selectedData.kilos,
        editMode.selectedData.reps,
        editMode.selectedData.sets,
      ]; */
    } else {
      newInputText.exerciseRunning = editMode.selectedData.exercise;
      newInputText.kiloms = editMode.selectedData.kiloms;
      newInputText.mins = editMode.selectedData.mins;
      /*  newInputText = [
        editMode.selectedData.exercise,
        editMode.selectedData.kiloms,
        editMode.selectedData.mins,
      ]; */
    }

    setInputText(newInputText);
  }, [editMode]);

  useEffect(() => {
    if (data.length !== 0) {
      localStorage.setItem("strength-data", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("strength-data"));
    if (savedData) {
      for (let i = 0; i < savedData.length; i++) {
        savedData[i].date = new Date(savedData[i].date);
      }
      setData(savedData);
    }
  }, []);

  function handleChange(event, key) {
    const newInputText = { ...inputText };
    newInputText[key] = event.target.value;
    setInputText(newInputText);
  }

  function handleImageClick(whichOne) {
    setSportSelected(whichOne);
  }

  return (
    <StrengthContainer>
      <Header>
        <Heading>Fitness App</Heading>
      </Header>
      <FormContainer>
        <ImageContainer>
          <Image
            className={sportSelected === "strength" ? "border" : "small-border"}
            onClick={() => {
              handleImageClick("strength");
            }}
            src="/strength.svg"
            alt="strength image of an Arm"
            width="100"
            height="100"
          ></Image>
          <Image
            className={sportSelected === "running" ? "border" : "small-border"}
            onClick={() => {
              handleImageClick("running");
            }}
            src="/running.svg"
            alt="running image runner"
            width="100"
            height="100"
          ></Image>
        </ImageContainer>
        <p className="big-text">
          {!editMode.editModeOn ? (
            <>
              {"New Entry for today:"}
              <br />
              {"It's " +
                day +
                `. Did you ${
                  sportSelected === "running" ? "run" : "workout"
                } today?`}
            </>
          ) : (
            "Editing for: " +
            (editMode.selectedData.date.getMonth() + 1).toString() +
            "/" +
            editMode.selectedData.date.getDate().toString() +
            "/" +
            editMode.selectedData.date.getFullYear().toString()
          )}
        </p>
        {sportSelected === "strength" ? (
          <StrengthForm
            handleSubmit={handleSubmit}
            handleCancelClick={handleCancelClick}
            handleChange={handleChange}
            editMode={editMode}
            inputText={inputText}
          />
        ) : (
          <RunningForm
            handleSubmit={handleSubmit}
            handleCancelClick={handleCancelClick}
            handleChange={handleChange}
            editMode={editMode}
            inputText={inputText}
          />
        )}
      </FormContainer>
      <CalendarHeatmap
        data={data}
        setData={setData}
        editMode={editMode}
        setEditMode={setEditMode}
        addNewEntry={addNewEntryStrength}
        setSportSelected={setSportSelected}
      />
    </StrengthContainer>
  );
}
