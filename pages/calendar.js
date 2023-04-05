import CalendarHeatmap from "../components/CalendarHeatmap";
import {useEffect, useState} from "react";
import StrengthContainer from "../components/StrengthContainer";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Navigation from "../components/Navigation";
import apiPost from "../apiServices/apiPost";
import apiUpdate from "../apiServices/apiUpdate";
import StyledParagraph from "../components/StyledParagraph";
import FormStrengthAndRunning from "../components/FormStrengthAndRunning";
import NavigationLink from "../components/NavigationLink";
import Graph from "../components/Graph";
import GraphText from "../components/GraphComponents/GraphText";
import FormContainer from "../components/FormContainer";
import StyledParagraphNormal from "../components/StyledParagraphNormal";

// ObjectId from https://stackoverflow.com/a/37438675
const ObjectId = (
  m = Math,
  d = Date,
  h = 16,
  s = (s) => m.floor(s).toString(h)
) => s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h));

let date = new Date();

let dateSelectedStart = date;

export default function Calendar({userName, favoriteExercises, data, setData}) {
  const [sportSelected, setSportSelected] = useState("strength");
  const [dateSelected, setDateSelected] = useState(dateSelectedStart);

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

  const [graphIsVisible, setGraphIsVisible] = useState(true);

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
    newObjectId,
    reps,
    sets,
    kilos,
    exerciseStrength,
    sportSelected
  ) {
    const NewDate = forDate;
    const save = {
      userName: userName,
      _id: newObjectId,
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

  function handleSubmit(event) {
    event.preventDefault();
    saveEdit(event);
    clearForm();
  }

  function saveEdit(event) {
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
    newData[indexToChange]._id = data[indexToChange]._id;
    apiUpdate(data[indexToChange]._id, save);
    setData(newData);

    editMode.editModeOn = false;
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
    if (editMode) {
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
    }
  }, [editMode]);

  function handleChange(event, key) {
    const newInputText = {...inputText, [key]: event.target.value};
    setInputText(newInputText);
  }

  function handleImageClick(whichOne) {
    setSportSelected(whichOne);
  }

  function handleGraphClick() {
    setGraphIsVisible(!graphIsVisible);
  }

  if (userName === "DontRender") {
    return (
      <>
        <StrengthContainer>
          <Header>
            <Heading>Fitness App</Heading>
          </Header>
          <NavigationLink selected={false} href="/">
            {"Change User "}
          </NavigationLink>
        </StrengthContainer>
      </>
    );
  }

  if (data.length === 0) {
    return (
      <>
        <StrengthContainer>
          <Header>
            <Heading>Fitness App</Heading>
          </Header>
          <FormContainer>
            <StyledParagraphNormal>Loading...</StyledParagraphNormal>
          </FormContainer>{" "}
        </StrengthContainer>
        <Navigation selected={"calendar"} userName={userName} />
      </>
    );
  }

  return (
    <>
      <StrengthContainer>
        <Header>
          <Heading>Fitness App</Heading>
        </Header>
        {userName !== undefined ? (
          <>
            <GraphText onClick={handleGraphClick}>Running Graph</GraphText>

            <Graph
              data={data}
              graphIsVisible={graphIsVisible}
              dateSelected={dateSelected}
            ></Graph>
            {editMode.editModeOn ? (
              <FormStrengthAndRunning
                favoriteExercises={favoriteExercises}
                handleImageClick={handleImageClick}
                sportSelected={sportSelected}
                editMode={editMode}
                handleSubmit={handleSubmit}
                handleCancelClick={handleCancelClick}
                handleChange={handleChange}
                inputText={inputText}
                day={day}
              />
            ) : (
              ""
            )}
            <CalendarHeatmap
              data={data}
              setData={setData}
              editMode={editMode}
              setEditMode={setEditMode}
              addNewEntry={addNewEntryStrength}
              ObjectId={ObjectId}
              setSportSelected={setSportSelected}
              dateSelected={dateSelected}
              setDateSelected={setDateSelected}
              setGraphIsVisible={setGraphIsVisible}
            />
          </>
        ) : (
          ""
        )}
      </StrengthContainer>
      <Navigation selected={"calendar"} userName={userName} />
    </>
  );
}
