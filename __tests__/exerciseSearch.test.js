import ExerciseSearch from "../pages/exerciseSearch";
import {render, screen} from "@testing-library/react";

const apiGetFavorite = require("../apiServices/apiGetFavorite");
jest.mock("../apiServices/apiGetFavorite", () => () => {});

test("see if search bar is rendered.", () => {
  render(<ExerciseSearch />);
  const searchName = screen.getAllByText(/search/i);
  expect(searchName.length).toBeGreaterThan(0);
  const searchBar = screen.getAllByRole("textbox");
  expect(searchBar.length).toBeGreaterThan(0);
  const selects = screen.getAllByRole("combobox");
  expect(selects.length).toBeGreaterThan(2);
});
