import MovieList from "../components/MovieList";
import { useRetrieveWatchlist } from "../hooks/useRetrieveWatchlist";
import useStore from "../hooks/useStore";

export default function Watchlist() {
  const watchlist = useStore((state) => state.watchlist);
  const { isLoading, error } = useRetrieveWatchlist();

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : watchlist.length > 0 ? (
        <MovieList movies={watchlist} />
      ) : (
        <p>Try searching a movie to add to your watchlist.</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
