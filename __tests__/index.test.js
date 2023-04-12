import Home from "../pages/";
import {screen, render} from "@testing-library/react";

test("the user name is displayed", () => {
  render(<Home userName="TestName" />);
  const userName = screen.getByText(/TestName/i);
  expect(userName).toBeInTheDocument();
});

test("there is attribution on the page", () => {
  render(<Home userName="TestName" />);
  const attribution = screen.getByText(/attribution/i);
  expect(attribution).toBeInTheDocument();
});

test("navbar is renderd", () => {
  render(<Home userName="TestName" />);
  const dumbbellImage = screen.getByAltText(/dumbbell image/i);
  expect(dumbbellImage).toBeInTheDocument();
  const calendarImage = screen.getByAltText(/calendar image/i);
  expect(calendarImage).toBeInTheDocument();
  const foodImage = screen.getByAltText(/food image/i);
  expect(foodImage).toBeInTheDocument();
});
