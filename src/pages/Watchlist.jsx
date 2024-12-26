import { useState } from "react";
import MovieList from "../components/MovieList";
import { useRetrieveWatchlist } from "../hooks/useRetrieveWatchlist";
import useStore from "../hooks/useStore";
import SelectForm from "../components/SelectForm";
import RuntimeFilter from "../components/RuntimeFilter";

const ITEM_PER_PAGE = 10;

export default function Watchlist() {
  const watchlist = useStore((state) => state.watchlist);
  const { isLoading, error } = useRetrieveWatchlist();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [runtimeLength, setRuntimeLength] = useState({ min: 0, max: 400 });
  const [runtimeFilterError, setRuntimeFilterError] = useState("");

  const timeFilteredWatchlist = watchlist.filter(
    (movie) =>
      movie.runtimeMinutes === null ||
      (movie.runtimeMinutes >= runtimeLength.min &&
        movie.runtimeMinutes <= runtimeLength.max),
  );

  const filterArray = selectedGenres.map((obj) => obj.label);
  const filteredWatchlist = timeFilteredWatchlist.filter((movie) =>
    movie.genres.some((genre) => filterArray.includes(genre)),
  );

  const maxPageNumber =
    filteredWatchlist.length > 0
      ? filteredWatchlist.length / ITEM_PER_PAGE
      : timeFilteredWatchlist.length / ITEM_PER_PAGE;

  const paginatedWatchlist =
    filteredWatchlist.length > 0
      ? filteredWatchlist.slice(
          (pageNumber - 1) * ITEM_PER_PAGE,
          pageNumber * ITEM_PER_PAGE,
        )
      : timeFilteredWatchlist.slice(
          (pageNumber - 1) * ITEM_PER_PAGE,
          pageNumber * ITEM_PER_PAGE,
        );

  function handleDecreasePageNumber() {
    if (pageNumber > 1) setPageNumber((pN) => pN - 1);
  }

  function handleIncreasePageNumber() {
    if (pageNumber < maxPageNumber) setPageNumber((pN) => pN + 1);
  }

  return (
    <div className="flex flex-col gap-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : watchlist.length > 0 ? (
        <>
          <SelectForm
            defaultValue={selectedGenres}
            onChange={setSelectedGenres}
          />
          <RuntimeFilter
            setRuntimeLength={setRuntimeLength}
            setRuntimeFilterError={setRuntimeFilterError}
          />
          {runtimeFilterError && (
            <span className="text-center">{runtimeFilterError}</span>
          )}
          {filterArray.length > 0 ? (
            filteredWatchlist.length > 0 ? (
              <MovieList movies={paginatedWatchlist} />
            ) : (
              <p>No movies match the selected filters.</p>
            )
          ) : (
            <MovieList movies={paginatedWatchlist} />
          )}
          <div className="flex justify-center gap-2 text-2xl">
            <button onClick={handleDecreasePageNumber}> &lt; </button>
            <span>{pageNumber}</span>
            <button onClick={handleIncreasePageNumber}> &gt; </button>
          </div>
        </>
      ) : (
        <p>Try searching a movie to add to your watchlist.</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
