import Heatmap from "../components/Heatmap";
import { useEffect, useState } from "react";
import StrengthForm from "../components/StrengthForm";

let date = new Date();
const startingData = [];

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
      date = new Date();
      const save = {
        date: date,
        reps: event.target.elements.reps.value,
        sets: event.target.elements.sets.value,
        kilos: event.target.elements.kilos.value,
        exercise: event.target.elements.exercise.value,
      };
      const newData = data.slice();
      newData.push(save);
      setData(newData);
    }
    clearForm();
  }
  function handleCancelClick(event) {
    console.log(event.target.parentElement);
    event.target.parentElement.reset();
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

  function handleChange(event, number) {
    const newInputText = [...inputText];
    newInputText[number] = event.target.value;
    setInputText(newInputText);
  }

  return (
    <>
      <h1>Yet Another Fitness App</h1>
      <p>
        {!editMode.editModeOn
          ? "Today is " + day
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
      />
    </>
  );
}
