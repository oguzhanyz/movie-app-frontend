import { useState } from "react";
import useStore from "../hooks/useStore";
import { checkWatchlistForMovie } from "../utils/checkWatchlistForMovie";

export default function MovieCard({ movie }) {
  const user = useStore((state) => state.user);
  const watchlist = useStore((state) => state.watchlist);
  const removeFromWatchlist = useStore((state) => state.removeFromWatchlist);

  const [isMovieInWatchlist, setIsMovieInWatchlist] = useState(
    checkWatchlistForMovie(movie._id, watchlist),
  );

  async function handleAddMovie() {
    try {
      const requestBody = {
        movieId: movie._id,
      };
      const res = await fetch("http://127.0.0.1:3000/api/watchlist", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();

      if (res.status !== 201) {
        throw new Error(data.message);
      }

      setIsMovieInWatchlist((inWatchlist) => !inWatchlist);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleRemoveMovie() {
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/watchlist/${movie._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data.message);
      }
      removeFromWatchlist(movie._id);
      setIsMovieInWatchlist((inWatchlist) => !inWatchlist);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="flex h-full flex-col justify-evenly p-4">
      <h2 className="text-lg font-bold text-gray-800">{movie.primaryTitle}</h2>
      <p className="text-sm text-gray-600">
        {movie.startYear}{" "}
        {movie.runtimeMinutes && `\u2022 ${movie.runtimeMinutes} minutes`}
      </p>
      {movie.genres.length > 0 && (
        <p className="text-gray-700">Genres: {movie.genres.toString()}</p>
      )}
      <p>
        {movie.averageRating}, {movie.numVotes}
      </p>
      {user !== null &&
        (isMovieInWatchlist ? (
          <button
            onClick={handleRemoveMovie}
            className="w-1/2 self-center rounded-md bg-red-400 p-1 active:scale-95"
          >
            Remove from watchlist
          </button>
        ) : (
          <button
            onClick={handleAddMovie}
            className="w-1/2 self-center rounded-md bg-green-400 p-1 active:scale-95"
          >
            Add to watchlist
          </button>
        ))}
    </div>
  );
}
