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
import UserNameForm from "../components/UserNameForm";

// ObjectId from https://stackoverflow.com/a/37438675
const ObjectId = (
  m = Math,
  d = Date,
  h = 16,
  s = (s) => m.floor(s).toString(h)
) => s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h));

let date = new Date();
let startingData = [];

export default function Calendar({ userName, setUserName }) {
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
      userName: userName,
      _id: ObjectId(),
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
      userName: userName,
      _id: ObjectId(),
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
          userName: userName,
          date: NewDate,
          sportSelected: sportSelected,
          reps: event.target.elements.reps.value,
          sets: event.target.elements.sets.value,
          kilos: event.target.elements.kilos.value,
          exerciseStrength: event.target.elements.exerciseStrength.value,
        };
      } else {
        save = {
          userName: userName,
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
      apiUpdate(data[indexToChange]._id, save);
      setData(newData);

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
  function handleCancelClick() {
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
    apiGet(userName);
  }, []);

  async function apiUpdate(id, save) {
    if (id) {
      const response = await fetch(`/api/exercises/${id}`, {
        method: "PUT",
        body: JSON.stringify(save),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("updated");
      } else {
        console.error(`Error: ${response.status}`);
      }
    } else {
      console.error("Error: No _id found.");
    }
  }

  async function apiDelete(id) {
    const response = await fetch(`/api/exercises/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("deleted");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

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

  async function apiGet(currentUser) {
    try {
      const response = await fetch(`/api/exercises/users/${currentUser}`);
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

  function handleUserNameFormSubmit(event, userInput) {
    event.preventDefault();
    setUserName(userInput);
    apiGet(userInput);
  }

  return (
    <StrengthContainer>
      <Header>
        <Heading>Fitness App</Heading>
      </Header>
      <UserNameForm
        userName={userName}
        handleUserNameFormSubmit={handleUserNameFormSubmit}
      />
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
        apiDelete={apiDelete}
      />
    </StrengthContainer>
  );
}
