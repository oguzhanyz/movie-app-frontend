export function checkWatchlistForMovie(movieId, watchlist) {
  return watchlist.some((movie) => movie._id === movieId);
}
