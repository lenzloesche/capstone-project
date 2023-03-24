import ExerciseSearch from "../pages/exerciseSearch";
import {render, screen, fireEvent} from "@testing-library/react";
test("see if search bar is rendered.", () => {
  render(<ExerciseSearch />);
  const searchName = screen.getAllByText(/search/i);
  expect(searchName.length).toBeGreaterThan(0);
  const searchBar = screen.getAllByRole("textbox");
  expect(searchBar.length).toBeGreaterThan(0);
  const selects = screen.getAllByRole("combobox");
  expect(selects.length).toBeGreaterThan(2);
});
