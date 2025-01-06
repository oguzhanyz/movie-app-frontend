import { useState } from "react";
import { useSearchMovies } from "../hooks/useSearchMovies";

export default function SearchBar({ pageNumber, setPageNumber, classNames }) {
  const [query, setQuery] = useState("");

  const { isLoading, error } = useSearchMovies(query, pageNumber);

  function handleSubmit(e) {
    e.preventDefault();
    setPageNumber(1);
    setQuery(e.target.query.value);
  }

  return (
    <div className={classNames}>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-4/5 max-w-xl sm:w-full 2xl:max-w-2xl"
      >
        <input
          type="text"
          placeholder="The Lord of the Rings"
          id="query"
          className="w-full rounded-l-full border-2 border-sky-400 bg-white px-4 py-2 text-black placeholder-slate-400 outline-none"
        />
        <button
          type="submit"
          className="-ml-1 rounded-r-full bg-sky-400 px-6 py-2 font-bold text-black transition-transform duration-200 hover:bg-sky-500 focus:outline-none active:scale-95 active:bg-sky-600"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
