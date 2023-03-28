import ExerciseDisplayed from ".";
import {render, screen, fireEvent} from "@testing-library/react";

const showFavorites = false;
const dat = {
  name: "Test1",
  difficulty: "easy",
  muscle: "shoulders",
  type: "strength",
  equipment: "dumbell",
  instructions: "TESTINSTRUCTIONS",
};
const handleFavoriteClick = () => {};
const handleDetailsClick = () => {
  !showDetails;
};
const showDetails = [
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
const index = 0;

test("test if title is displayed. and tests if instructions is only displayed if details are shown", () => {
  render(
    <ExerciseDisplayed
      showFavorites={showFavorites}
      dat={dat}
      handleFavoriteClick={handleFavoriteClick}
      handleDetailsClick={handleDetailsClick}
      showDetails={showDetails}
      index={index}
    />
  );
  const title = screen.getByText(/Test1/i);
  expect(title).toBeInTheDocument;
  const instructions = screen.getByText(/TESTINSTRUCTIONS/i);
  expect(instructions).toBeInTheDocument;
  const button = screen.getByText(/Details/i);
  fireEvent.click(button);
  expect(instructions).not.toBeInTheDocument;
});

test("when you click the favorite icon, the function is triggered.", () => {
  const handleFavoriteClickMock = jest.fn();

  render(
    <ExerciseDisplayed
      showFavorites={showFavorites}
      dat={dat}
      handleFavoriteClick={handleFavoriteClickMock}
      handleDetailsClick={handleDetailsClick}
      showDetails={showDetails}
      index={index}
    />
  );
  const favoriteIcon = screen.getByAltText(/star/i);
  fireEvent.click(favoriteIcon);
  expect(handleFavoriteClickMock).toHaveBeenCalled();
});
