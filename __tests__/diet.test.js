import Diet from "../pages/diet.js";
import {render, screen} from "@testing-library/react";

const fetchDiet = require("../apiServices/fetchDiet");
jest.mock("../apiServices/fetchDiet", () => () => {});

test("there is a search input and button", () => {
  render(<Diet userName="Testuser" />);
  const input = screen.getAllByRole("textbox");
  expect(input.length).toBeGreaterThan(0);
  const button = screen.getByRole("button", {name: /search/i});
  expect(button).toBeInTheDocument();
});
