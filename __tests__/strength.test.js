import Strength from "../pages/strength";
import { render, screen, fireEvent } from "@testing-library/react";
test("see if search bar is rendered.", () => {
  render(<Strength />);
  const searchName = screen.getAllByText(/search/i);
  expect(searchName.length).toBeGreaterThan(0);
  const searchBar = screen.getAllByRole("textbox");
  expect(searchBar.length).toBeGreaterThan(0);
});
