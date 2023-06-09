import Diet from "../pages/diet.js";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";

const fakeData = [
  {
    name: "Testit!",
  },
];

const fetchDiet = require("../apiServices/fetchDiet");
jest.mock("../apiServices/fetchDiet", () => jest.fn());
fetchDiet.mockReturnValue(fakeData);

test("there is a search input and button", () => {
  render(<Diet userName="Testuser" />);
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
  const button = screen.getByRole("button", {name: /search/i});
  expect(button).toBeInTheDocument();
});

test("when you enter a searchterm and hit search, the fetch function is called and the data is displayed.", async () => {
  render(<Diet userName="Testuser" />);
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", {name: /search/i});
  fireEvent.change(input, {target: {value: "TestText"}});
  fireEvent.click(button);
  await waitFor(() => {
    expect(fetchDiet).toHaveBeenCalled();
    const testText = screen.getByText(/Testit!/i);
    expect(testText).toBeInTheDocument();
  });
});
