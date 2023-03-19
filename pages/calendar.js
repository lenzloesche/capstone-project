import Heatmap from "../components/Heatmap";
import { useEffect, useState } from "react";
import StrengthForm from "../components/StrengthForm";
import StrengthContainer from "../components/StrengthContainer";
import Image from "next/image";
import ImageContainer from "../components/ImageContainer";
import RunningForm from "../components/RunningForm";

let date = new Date();
let startingData = [];

export default function Calendar() {
  const [data, setData] = useState(startingData);
  const [sportSelected, setSportSelected] = useState("strength");

  const [editMode, setEditMode] = useState({
    editModeOn: false,
    selectedData: "",
  });
  const [inputText, setInputText] = useState(["", "", "", ""]);
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
    date = forDate;
    const save = {
      date: date,
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
    date = forDate;
    const save = {
      date: date,
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
      date = editMode.selectedData.date;
      let save = {};
      if (sportSelected === "strength") {
        save = {
          date: date,
          sportSelected: sportSelected,
          reps: event.target.elements.reps.value,
          sets: event.target.elements.sets.value,
          kilos: event.target.elements.kilos.value,
          exercise: event.target.elements.exercise.value,
        };
      } else {
        save = {
          date: date,
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
      selectedData: { exercise: "", kilos: "", reps: "", sets: "" },
    };
    newEditMode.editModeOn = false;
    setEditMode(newEditMode);
  }

  useEffect(() => {
    const newInputText = [
      editMode.selectedData.exercise,
      editMode.selectedData.kilos,
      editMode.selectedData.reps,
      editMode.selectedData.sets,
    ];
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

  function handleChange(event, number) {
    const newInputText = [...inputText];
    newInputText[number] = event.target.value;
    setInputText(newInputText);
  }

  function handleImageClick(whichOne) {
    setSportSelected(whichOne);
  }

  return (
    <StrengthContainer>
      <h1>Yet Another Fitness App</h1>
      <ImageContainer>
        <Image
          className={sportSelected === "strength" ? "border" : ""}
          onClick={() => {
            handleImageClick("strength");
          }}
          src="/strength.svg"
          alt="strength image of an Arm"
          width="100"
          height="100"
        ></Image>
        <Image
          className={sportSelected === "running" ? "border" : ""}
          onClick={() => {
            handleImageClick("running");
          }}
          src="/running.svg"
          alt="running image female runner"
          width="100"
          height="100"
        ></Image>
      </ImageContainer>
      <p>
        {!editMode.editModeOn
          ? "Did you workout today? It's " + day
          : "Editing for " + editMode.selectedData.date.toString()}
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

      <Heatmap
        data={data}
        setData={setData}
        editMode={editMode}
        setEditMode={setEditMode}
        addNewEntry={addNewEntryStrength}
      />
    </StrengthContainer>
  );
}