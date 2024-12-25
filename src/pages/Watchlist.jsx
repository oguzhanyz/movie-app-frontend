import { useState } from "react";
import MovieList from "../components/MovieList";
import { useRetrieveWatchlist } from "../hooks/useRetrieveWatchlist";
import useStore from "../hooks/useStore";
import SelectForm from "../components/SelectForm";

export default function Watchlist() {
  const watchlist = useStore((state) => state.watchlist);
  const { isLoading, error } = useRetrieveWatchlist();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemPerPage = 3;

  const filterArray = selectedGenres.map((obj) => obj.label);
  const filteredWatchlist = watchlist.filter((movie) =>
    movie.genres.some((genre) => filterArray.includes(genre)),
  );

  const maxPageNumber =
    filteredWatchlist.length > 0
      ? filteredWatchlist.length / itemPerPage
      : watchlist.length / itemPerPage;

  const paginatedWatchlist =
    filteredWatchlist.length > 0
      ? filteredWatchlist.slice(
          (pageNumber - 1) * itemPerPage,
          pageNumber * itemPerPage,
        )
      : watchlist.slice(
          (pageNumber - 1) * itemPerPage,
          pageNumber * itemPerPage,
        );

  function handleDecreasePageNumber() {
    if (pageNumber > 1) setPageNumber((pN) => pN - 1);
  }

  function handleIncreasePageNumber() {
    if (pageNumber < maxPageNumber) setPageNumber((pN) => pN + 1);
  }

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : watchlist.length > 0 ? (
        <div>
          <SelectForm
            defaultValue={selectedGenres}
            onChange={setSelectedGenres}
          />
          {filterArray.length > 0 ? (
            filteredWatchlist.length > 0 ? (
              <MovieList movies={paginatedWatchlist} />
            ) : (
              <p>No movies match the selected genres.</p>
            )
          ) : (
            <MovieList movies={paginatedWatchlist} />
          )}
          <div className="flex justify-center gap-2 text-2xl">
            <button onClick={handleDecreasePageNumber}> &lt; </button>
            <span>{pageNumber}</span>
            <button onClick={handleIncreasePageNumber}> &gt; </button>
          </div>
        </div>
      ) : (
        <p>Try searching a movie to add to your watchlist.</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
