import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  return (
    <>
      <ul className="flex flex-col items-center justify-center gap-4">
        {movies.map((movie) => {
          return <MovieCard movie={movie} key={movie._id} />;
        })}
      </ul>
    </>
  );
}
