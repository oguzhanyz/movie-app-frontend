import { create } from "zustand";

const useStore = create((set, get) => ({
  user: null,
  searchResults: [],
  watchlist: [],

  setUser: (user) => set({ user }),

  setSearchResults: (results) => set({ searchResults: results }),

  addToWatchlist: (movie) => {
    const { watchlist } = get();
    if (!watchlist.some((item) => item.id === movie.id)) {
      set({ watchlist: [...watchlist, movie] });
    }
  },
}));

export default useStore;
