import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import useStore from "../hooks/useStore";
import { useState, useEffect, useRef } from "react";

export default function Search() {
  const searchResults = useStore((state) => state.searchResults);
  const totalPages = useStore((state) => state.totalPages);
  const totalMovies = useStore((state) => state.totalMovies);
  const [pageNumber, setPageNumber] = useState(1);
  const prevResultsLengthRef = useRef(0);
  const [shouldScroll, setShouldScroll] = useState(false);

  function increasePageNumber() {
    setPageNumber((pN) => pN + 1);
    setShouldScroll(true);
  }

  useEffect(() => {
    if (shouldScroll && searchResults.length > prevResultsLengthRef.current) {
      setTimeout(() => {
        const scrollDistance = window.scrollY + window.innerHeight * 0.7;
        window.scrollTo({
          top: scrollDistance,
          behavior: "smooth",
        });
        setShouldScroll(false);
      }, 100);
    }
    prevResultsLengthRef.current = searchResults.length;
  }, [searchResults.length, shouldScroll]);

  return (
    <div>
      <SearchBar
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        classNames={
          searchResults.length > 0
            ? "mb-4 flex items-center justify-center"
            : "flex min-h-[50vh] items-center justify-center"
        }
      />
      {searchResults.length > 0 && (
        <div>
          <p className="text-center">{`${totalMovies} results`}</p>
          <MovieList movies={searchResults} />
          {pageNumber < totalPages && (
            <button
              onClick={increasePageNumber}
              className="my-3 flex justify-self-center rounded-md border bg-sky-400 p-3 font-semibold hover:bg-sky-500 focus:outline-none active:scale-95 active:bg-sky-600"
            >
              Show more
            </button>
          )}
        </div>
      )}
    </div>
  );
}
