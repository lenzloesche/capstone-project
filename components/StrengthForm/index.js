export default function Form({
  handleSubmit,
  handleCancelClick,
  handleChange,
  editMode,
  inputText,
}) {
  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <label htmlFor="exercise">
        Which exercise?
        <input
          id="exercise"
          type="text"
          value={inputText[0]}
          onChange={(event) => handleChange(event, 0)}
          required
        ></input>
      </label>
      <br />
      <label htmlFor="kilos">
        How many kilograms?
        <input
          id="kilos"
          type="number"
          value={inputText[1]}
          onChange={(event) => handleChange(event, 1)}
          required
        ></input>
      </label>
      <br />
      <label htmlFor="reps">
        How many reps?
        <input
          id="reps"
          type="number"
          value={inputText[2]}
          onChange={(event) => handleChange(event, 2)}
          required
        ></input>
      </label>
      <br />
      <label htmlFor="sets">
        How many sets?
        <input
          id="sets"
          type="number"
          value={inputText[3]}
          onChange={(event) => handleChange(event, 3)}
          required
        ></input>
      </label>
      <br />
      <button type="submit">Save</button>
      {editMode.editModeOn ? (
        <button
          onClick={(event) => {
            handleCancelClick(event);
          }}
        >
          Cancel
        </button>
      ) : (
        ""
      )}
    </form>
  );
}
