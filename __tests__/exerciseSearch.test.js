import ExerciseSearch from "../pages/exerciseSearch";
import {render, screen, fireEvent, act} from "@testing-library/react";
/* 
test("see if search bar is rendered.", () => {
  render(<ExerciseSearch />);
  const searchName = screen.getAllByText(/search/i);
  expect(searchName.length).toBeGreaterThan(0);
  const searchBar = screen.getAllByRole("textbox");
  expect(searchBar.length).toBeGreaterThan(0);
  const selects = screen.getAllByRole("combobox");
  expect(selects.length).toBeGreaterThan(2);
}); */

jest.mock("../apiServices/fetchStrength", () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return [
        {
          name: "testinput1",
          difficulty: "easy",
          type: "bar",
          equipment: "barbell",
          instructions: "instructions",
        },
        {
          name: "testinput2",
          difficulty: "easy",
          type: "bar",
          equipment: "barbell",
          instructions: "instructions",
        },
      ];
    }),
  };
});

const fetchStrength = require("../apiServices/fetchStrength").default;

test("if I search and find a result, there is a favorite button", async () => {
  render(
    <ExerciseSearch favoriteExercises={[]} setFavoriteExercises={() => {}} />
  );
  const searchButton = screen.getByRole("button", {name: /search/i});
  const searchBar = screen.getByRole("textbox");
  fireEvent.change(searchBar, {target: {value: "TestText"}});
  await act(async () => {
    await fireEvent.click(searchButton);
  });
  expect(fetchStrength).toHaveBeenCalled();
  const testInput = screen.getByText(/testinput1/i);
  expect(testInput).toBeInTheDocument();
  const favoriteButton = screen.getAllByAltText(/bookmark/i);
  expect(favoriteButton[0]).toBeInTheDocument();
});
