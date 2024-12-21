export default function MovieCard({ movie }) {
  return (
    <li className="transform overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:scale-105">
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">
          {movie.primaryTitle}
        </h2>
        <p className="text-sm text-gray-600">
          {movie.startYear} &bull; {movie.runtimeMinutes} minutes
        </p>
        <p className="text-gray-700">Genres: {movie.genres.toString()}</p>
      </div>
    </li>
  );
}
