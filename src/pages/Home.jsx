import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRandom() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch("http://127.0.0.1:3000/api/movie/random");

        const data = await res.json();

        if (!res.ok) {
          const errorMessage = data.message || "Failed to fetch movie.";
          throw new Error(errorMessage);
        }

        setMovie(data);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRandom();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 sm:p-8 md:p-12 lg:p-16">
      <h1 className="pt-20 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
        Here&apos;s a random movie for you.
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : movie ? (
        <div className="h-64 w-full transform overflow-hidden rounded-lg border bg-white shadow-md transition duration-300 hover:scale-105 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
          <MovieCard movie={movie} />
        </div>
      ) : (
        <p>No movie found.</p>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}
