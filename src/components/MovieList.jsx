import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  return (
    <>
      <ul className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
        {movies.map((movie) => {
          return (
            <li
              key={movie._id}
              className="h-64 w-4/5 transform overflow-hidden rounded-lg border bg-white shadow-md transition duration-300 hover:scale-105 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5"
            >
              <MovieCard movie={movie} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
