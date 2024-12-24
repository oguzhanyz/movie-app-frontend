export function checkWatchlistForMovie(movieId, watchlist) {
  if (!watchlist) return false;
  return watchlist?.some((movie) => movie._id === movieId);
}
