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

  function handleGenreChange(selectedOptions) {
    setSelectedGenres(selectedOptions);
    setPageNumber(1);
  }

  return (
    <div className="flex flex-col gap-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : watchlist.length > 0 ? (
        <>
          <SelectForm
            defaultValue={selectedGenres}
            onChange={handleGenreChange}
          />
          <RuntimeFilter
            setRuntimeLength={setRuntimeLength}
            setRuntimeFilterError={setRuntimeFilterError}
            classNames={"w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto"}
          />
          {runtimeFilterError && (
            <span className="text-center text-red-500">
              {runtimeFilterError}
            </span>
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
          <div className="flex items-center justify-center gap-2 text-2xl">
            <button
              onClick={handleDecreasePageNumber}
              className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
            >
              &lt;
            </button>
            <span>{pageNumber}</span>
            <button
              onClick={handleIncreasePageNumber}
              className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
            >
              &gt;
            </button>
          </div>
        </>
      ) : (
        <p className="text-center">
          Try searching a movie to add to your watchlist.
        </p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
}
