import {render, screen, fireEvent} from "@testing-library/react";
import Calendar from "../pages/calendar";
const todaysDate = new Date();

const fakeData = [
  {
    date: todaysDate,
    exerciseStrength: "test exercise",
    kilos: 1,
    reps: 2,
    sets: 3,
    sportSelected: "strength",
    userName: "TestName",
    __v: 0,
    _id: "641c07879d14c21178b39769",
  },
];

const userName = "TestName";

const apiPost = require("../apiServices/apiPost");
jest.mock("../apiServices/apiPost", () => () => {});

const apiDelete = require("../apiServices/apiDelete");
jest.mock("../apiServices/apiDelete", () => () => {});

describe("Calendar", () => {
  it("Test if there are Input fields with label: Kilograms, reps, sets", async () => {
    render(<Calendar userName={userName} data={fakeData} setData={() => {}} />);

    const dateMonth = `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}`;
    const divToClick = screen.getByText(dateMonth);
    fireEvent.click(divToClick);

    const buttonToClick = screen.getByText("New Exercise Entry");
    window.scrollTo = jest.fn();

    fireEvent.click(buttonToClick);

    const exercise = await screen.findAllByText(/exercise/i);
    expect(exercise.length).toBeGreaterThan(0);
    const kilos = await screen.findAllByText(/kilograms/i);
    expect(kilos.length).toBeGreaterThan(0);
    const reps = await screen.findAllByText(/reps/i);
    expect(reps.length).toBeGreaterThan(0);
    const sets = await screen.findAllByText(/sets/i);
    expect(sets.length).toBeGreaterThan(0);
    const inputsNumber = await screen.findAllByRole("spinbutton");
    expect(inputsNumber.length).toBeGreaterThan(2);
    const inputsText = await screen.findAllByRole("textbox");
    expect(inputsText.length).toBeGreaterThan(0);
  });
  it("if you click on the image, then you have different input fields.", async () => {
    render(<Calendar userName={userName} data={fakeData} setData={() => {}} />);

    const dateMonth = `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}`;
    const divToClick = screen.getByText(dateMonth);
    fireEvent.click(divToClick);

    const buttonToClick = screen.getByText("New Exercise Entry");
    fireEvent.click(buttonToClick);

    const runnerImage = await screen.getByRole("img", {name: /runner/i});
    const inputsNumberBefore = await screen.findAllByRole("spinbutton");
    fireEvent.click(runnerImage);
    const inputsNumberAfter = await screen.findAllByRole("spinbutton");
    expect(inputsNumberAfter.length).toBeLessThan(inputsNumberBefore.length);
  });

  it("Test if there is a calendar with different divs that can be clicked and a different date is displayed.", async () => {
    render(<Calendar userName={userName} data={fakeData} setData={() => {}} />);
    const divs = await screen.getAllByRole("generic");
    expect(divs.length).toBeGreaterThanOrEqual(70);
    const dateText = await screen.getByText(/date selected/i);
    const todaysDate = new Date();
    const dateMonth = `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}`;
    const divToClick = screen.getByText(dateMonth);
    fireEvent.click(divToClick);
    expect(dateText.innerHTML.includes(dateMonth)).toBe(true);
  });
  it("Test if there is the entry that got fetched and you can delete the entry.", async () => {
    render(<Calendar userName={userName} data={fakeData} setData={() => {}} />);

    const dateMonth = `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}`;
    const divToClick = screen.getByText(dateMonth);
    fireEvent.click(divToClick);

    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeInTheDocument();
  });
});
