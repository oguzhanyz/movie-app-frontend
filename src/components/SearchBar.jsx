import { useState } from "react";
import { useSearchMovies } from "../hooks/useSearchMovies";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const { isLoading, error } = useSearchMovies(query);

  function handleSubmit(e) {
    e.preventDefault();
    setQuery(e.target.query.value);
  }

  return (
    <div className="my-5 flex justify-center">
      <form onSubmit={handleSubmit}>
        <input type="text" id="query" className="mr-1 border-[1px]" />
        <button type="submit" className="bg-blue-400 p-1" disabled={isLoading}>
          {isLoading ? "Loading..." : "Search"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
