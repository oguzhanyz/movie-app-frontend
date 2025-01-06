const MIN_LENGTH = 0;
const MAX_LENGTH = 400;

export default function RuntimeFilter({
  setRuntimeLength,
  setRuntimeFilterError,
  classNames,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    let minValue = parseInt(e.target.minLength.value.replace(/^0+/, "")) || 0;
    let maxValue =
      parseInt(e.target.maxLength.value.replace(/^0+/, "")) || MAX_LENGTH;

    if (minValue >= maxValue || maxValue <= minValue) {
      setRuntimeFilterError("Max length should be greater than min length.");
      return;
    }

    setRuntimeLength({
      min: minValue,
      max: maxValue,
    });

    setRuntimeFilterError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col items-center justify-center gap-4 rounded-lg border bg-white p-4 sm:flex-row ${classNames}`}
    >
      <div className="flex flex-row items-center gap-2">
        <label htmlFor="minLength" className="font-light">
          Minimum Runtime:
        </label>
        <input
          type="number"
          name="minLength"
          id="minLength"
          className="rounded border p-1"
          min={MIN_LENGTH}
          max={MAX_LENGTH - 1}
          placeholder={MIN_LENGTH}
        />
      </div>
      <div className="flex flex-row items-center gap-2">
        <label htmlFor="maxLength" className="font-light">
          Maximum Runtime:
        </label>
        <input
          type="number"
          name="maxLength"
          id="maxLength"
          className="rounded border p-1"
          min={MIN_LENGTH + 1}
          max={MAX_LENGTH}
          placeholder={MAX_LENGTH}
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-sky-400 p-2 text-white hover:bg-sky-500 focus:outline-none active:scale-95 active:bg-sky-600"
      >
        Apply
      </button>
    </form>
  );
}
