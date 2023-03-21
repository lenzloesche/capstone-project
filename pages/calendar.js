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
    selectedData: {
      exerciseStrength: "",
      kilos: "",
      reps: "",
      sets: "",
      exerciseRunning: "",
      kiloms: "",
      mins: "",
    },
  });
  const [inputText, setInputText] = useState({
    exerciseStrength: "",
    kilos: "",
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
    exerciseStrength,
    sportSelected
  ) {
    const NewDate = forDate;
    const save = {
      date: NewDate,
      sportSelected: sportSelected,
      reps: reps,
      sets: sets,
      kilos: kilos,
      exerciseStrength: exerciseStrength,
    };
    const newData = data.slice();
    newData.push(save);
    setData(newData);
    apiPost(save);
  }

  function addNewEntryRunning(
    forDate,
    kiloms,
    mins,
    exerciseRunning,
    sportSelected
  ) {
    const NewDate = forDate;
    const save = {
      date: NewDate,
      sportSelected: sportSelected,
      kiloms: kiloms,
      mins: mins,
      exerciseRunning: exerciseRunning,
    };
    const newData = data.slice();
    newData.push(save);
    setData(newData);
    apiPost(save);
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
          exerciseStrength: event.target.elements.exerciseStrength.value,
        };
      } else {
        save = {
          date: NewDate,
          sportSelected: sportSelected,
          kiloms: event.target.elements.kiloms.value,
          mins: event.target.elements.mins.value,
          exerciseRunning: event.target.elements.exerciseRunning.value,
        };
      }

      const newData = data.slice();
      const indexToChange = newData.findIndex((dat) => {
        return dat.date.toString() === editMode.selectedData.date.toString();
      });
      newData[indexToChange] = save;
      setData(newData);
      apiPost(save);

      editMode.editModeOn = false;
    } else {
      if (sportSelected === "strength") {
        addNewEntryStrength(
          new Date(),
          event.target.elements.reps.value,
          event.target.elements.sets.value,
          event.target.elements.kilos.value,
          event.target.elements.exerciseStrength.value,
          sportSelected
        );
      } else {
        addNewEntryRunning(
          new Date(),
          event.target.elements.kiloms.value,
          event.target.elements.mins.value,
          event.target.elements.exerciseRunning.value,
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
        exerciseRunning: "",
        exerciseStrength: "",
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
    const newInputText = {
      exerciseStrength: editMode.selectedData.exerciseStrength ?? "",
      kilos: editMode.selectedData.kilos ?? "",
      reps: editMode.selectedData.reps ?? "",
      sets: editMode.selectedData.sets ?? "",
      exerciseRunning: editMode.selectedData.exerciseRunning ?? "",
      kiloms: editMode.selectedData.kiloms ?? "",
      mins: editMode.selectedData.mins ?? "",
    };

    setInputText(newInputText);
  }, [editMode]);

  useEffect(() => {
    if (data.length !== 0) {
      localStorage.setItem("strength-data", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    /*  const savedData = JSON.parse(localStorage.getItem("strength-data"));
    if (savedData) {
      for (let i = 0; i < savedData.length; i++) {
        savedData[i].date = new Date(savedData[i].date);
      }
      setData(savedData);
      console.log(savedData);
    } */
    apiGet();
  }, []);
  async function apiPost(save) {
    const response = await fetch("/api/exercises", {
      method: "POST",
      body: JSON.stringify(save),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("saved");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  async function apiGet() {
    try {
      const response = await fetch("/api/exercises");
      if (response.ok) {
        const dataFetch = await response.json();
        for (let i = 0; i < dataFetch.length; i++) {
          dataFetch[i].date = new Date(dataFetch[i].date);
        }
        console.log("datafetch", dataFetch);
        setData(dataFetch);
      } else {
        console.log("Response not OK.");
      }
    } catch (error) {
      console.log("Error fetching: ", error);
    }
  }
  function handleChange(event, key) {
    const newInputText = { ...inputText, [key]: event.target.value };
    setInputText(newInputText);
  }

  function handleImageClick(whichOne) {
    setSportSelected(whichOne);
  }
  //useFetch();
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
