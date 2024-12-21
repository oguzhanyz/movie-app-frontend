import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import useStore from "../hooks/useStore";

export default function Search() {
  const searchResults = useStore((state) => state.searchResults);
  return (
    <div>
      <SearchBar />
      {searchResults.length > 0 && <MovieList movies={searchResults} />}
    </div>
  );
}
