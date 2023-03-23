import { render, screen, fireEvent } from "@testing-library/react";
import Calendar from "../pages/calendar";
//import apiGet from "../components/apiGet";

const fakeData = [
  {
    date: new Date("2023-03-22T11:11:35.944Z"),
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

//import * as apiGet from "../components/apiGet";

const apiGet = require("../components/apiGet");

jest.mock("../components/apiGet", () => (currentUser, setData) => {
  console.log("it works");

  setData(fakeData);
});

describe("isAtLeast18", () => {
  it("fails if value is not recognised as integer", () => {
    render(<Calendar userName={userName} />);

    // Should pass, but fails because of the isInteger() mock
    //expect(isAtLeast18(123)).toBe(false);
    // Should fail either way
    //expect(isAtLeast18("abc")).toBe(false);
  });
});

/* 
jest.mock("../components/apiGet", () => ({
  // ...apiGet,
  apiGet: jest.fn(() => {
    console.log("it WOrks!");
  }),
}));

test("random test", async () => {
  render(<Calendar userName={userName} />);
  expect(0).toBe(0);
}); */

/* jest.mock("../pages/calendar", () => {
  const originalModule = jest.requireActual("../pages/calendar");
  return {
    __esModule: true,
    ...originalModule,
    apiGet: jest.fn((currentUser, setData) => {
      console.log("mockFunctionGetsCalled");
      setData(fakeData);
    }),
  };
}); */
/* const apiGetMock =jest.mock("../components/apiGet", () => ({
  apiGet: jest.fn((currentUser, setData) => {
    console.log("mockFunctionGetsCalled");
    setData(fakeData);
  }),
})); */

/* 
let apiGet = require("../components/apiGet");
it("mocks entire module", () => {
  apiGet = jest.fn((currentUser, setData) => {
    console.log("mockFunctionGetsCalled");
    setData(fakeData);
  });
  render(<Calendar userName={userName} />);
});
 */

/* 
test("Test if there are Input fields with label: Kilograms, reps, sets", async () => {
  render(<Calendar />);
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

test("if you click on the image, then you have different input fields.", async () => {
  render(<Calendar />);
  const runnerImage = await screen.getByRole("img", { name: /runner/i });
  const inputsNumberBefore = await screen.findAllByRole("spinbutton");
  fireEvent.click(runnerImage);
  const inputsNumberAfter = await screen.findAllByRole("spinbutton");
  expect(inputsNumberAfter.length).toBeLessThan(inputsNumberBefore.length);
});

test("Test if there is a calendar with different divs that can be clicked and a different date is displayed.", async () => {
  render(<Calendar />);
  const divs = await screen.getAllByRole("generic");
  expect(divs.length).toBeGreaterThanOrEqual(70);
  const dateText = await screen.getByText(/select a date/i);
  const todaysDate = new Date();
  const dateMonth = `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}`;
  const divToClick = screen.getByText(dateMonth);
  fireEvent.click(divToClick);
  expect(dateText.innerHTML.includes(dateMonth)).toBe(true);
}); */

/* test("Test if you create a new entry that you can display it (with the info) and delete it.", async () => {
  render(<Calendar />);

  const inputsNumber = await screen.findAllByRole("spinbutton");
  const inputsText = await screen.findAllByRole("textbox");
  fireEvent.change(inputsText[0], { target: { value: "test1" } });
  fireEvent.change(inputsNumber[0], { target: { value: "123456" } });
  fireEvent.change(inputsNumber[1], { target: { value: "09876" } });
  fireEvent.change(inputsNumber[2], { target: { value: "123456789" } });
  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  const todaysDate = new Date();
  const dateMonth = `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}`;
  const divToClick = screen.getByText(dateMonth);
  fireEvent.click(divToClick);
  const testText = screen.getByText(/123456789/i);
  expect(testText).toBeInTheDocument();

  const deleteButton = screen.getByText("Delete");
  fireEvent.click(deleteButton);
  expect(testText).not.toBeInTheDocument();
}); */
