import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import useStore from "../hooks/useStore";
import { useState } from "react";

export default function Search() {
  const searchResults = useStore((state) => state.searchResults);
  const totalPages = useStore((state) => state.totalPages);
  const totalMovies = useStore((state) => state.totalMovies);
  const [pageNumber, setPageNumber] = useState(1);

  function increasePageNumber() {
    setPageNumber((pN) => pN + 1);
  }
  return (
    <div>
      <SearchBar pageNumber={pageNumber} setPageNumber={setPageNumber} />
      {searchResults.length > 0 && (
        <div>
          <p className="text-center">{`${totalMovies} results`}</p>
          <MovieList movies={searchResults} />
          {pageNumber < totalPages && (
            <button onClick={increasePageNumber} className="border">
              Show more
            </button>
          )}
        </div>
      )}
    </div>
  );
}
