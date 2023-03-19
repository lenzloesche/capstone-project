import Heatmap from "../components/Heatmap";
import { useEffect, useState } from "react";
import StrengthForm from "../components/StrengthForm";
import StrengthContainer from "../components/StrengthContainer";

let date = new Date();
let startingData = [];

export default function Strength() {
  const [data, setData] = useState(startingData);

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

  function addNewEntry(forDate, reps, sets, kilos, exercise) {
    date = forDate;
    const save = {
      date: date,
      reps: reps,
      sets: sets,
      kilos: kilos,
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
      const save = {
        date: date,
        reps: event.target.elements.reps.value,
        sets: event.target.elements.sets.value,
        kilos: event.target.elements.kilos.value,
        exercise: event.target.elements.exercise.value,
      };
      const newData = data.slice();
      const indexToChange = newData.findIndex((dat) => {
        return dat.date.toString() === editMode.selectedData.date.toString();
      });
      newData[indexToChange] = save;
      setData(newData);
      editMode.editModeOn = false;
    } else {
      addNewEntry(
        new Date(),
        event.target.elements.reps.value,
        event.target.elements.sets.value,
        event.target.elements.kilos.value,
        event.target.elements.exercise.value
      );
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
    for (let i = 0; i < savedData.length; i++) {
      savedData[i].date = new Date(savedData[i].date);
    }
    setData(savedData);
  }, []);

  function handleChange(event, number) {
    const newInputText = [...inputText];
    newInputText[number] = event.target.value;
    setInputText(newInputText);
  }

  return (
    <StrengthContainer>
      <h1>Yet Another Fitness App</h1>
      <p>
        {!editMode.editModeOn
          ? "Did you workout today? It's " + day
          : "Editing for " + editMode.selectedData.date.toString()}
      </p>
      <StrengthForm
        handleSubmit={handleSubmit}
        handleCancelClick={handleCancelClick}
        handleChange={handleChange}
        editMode={editMode}
        inputText={inputText}
      />

      <Heatmap
        data={data}
        setData={setData}
        editMode={editMode}
        setEditMode={setEditMode}
        addNewEntry={addNewEntry}
      />
    </StrengthContainer>
  );
}
