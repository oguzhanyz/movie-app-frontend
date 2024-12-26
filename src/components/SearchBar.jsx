import { useState } from "react";
import { useSearchMovies } from "../hooks/useSearchMovies";
import useStore from "../hooks/useStore";

export default function SearchBar({ pageNumber, setPageNumber }) {
  const [query, setQuery] = useState("");
  const searchResults = useStore((state) => state.searchResults);

  const { isLoading, error } = useSearchMovies(query, pageNumber);

  function handleSubmit(e) {
    e.preventDefault();
    setPageNumber(1);
    setQuery(e.target.query.value);
  }

  return (
    <div
      className={
        searchResults.length > 0
          ? "mb-4 flex items-center justify-center"
          : "flex min-h-[50vh] items-center justify-center"
      }
    >
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="The Lord of the Rings"
          id="query"
          className="rounded-l-full border-2 border-sky-400 bg-white px-4 py-2 text-black placeholder-slate-400 outline-none"
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
