import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  return (
    <>
      <ul className="flex flex-col items-center justify-center gap-4">
        {movies.map((movie) => {
          return (
            <li
              key={movie._id}
              className="h-64 w-2/5 transform overflow-hidden rounded-lg border bg-white shadow-md transition duration-300 hover:scale-105"
            >
              <MovieCard movie={movie} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
