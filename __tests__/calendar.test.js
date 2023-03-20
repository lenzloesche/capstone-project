import Calendar from "../pages/calendar";
import { render, screen, fireEvent } from "@testing-library/react";

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
});
