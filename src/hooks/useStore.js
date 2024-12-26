import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      searchResults: [],
      watchlist: [],
      totalPages: 0,
      totalMovies: 0,

      reset: () => {
        set({ user: null });
        set({ searchResults: [] });
        set({ watchlist: [] });
      },

      setUser: (user) => set({ user }),

      setSearchResults: (results) => set({ searchResults: results }),

      appendToSearchResults: (results) => {
        const { searchResults } = get();
        set({ searchResults: [...searchResults, ...results] });
      },

      setWatchlist: (results) => set({ watchlist: results }),

      addToWatchlist: (movie) => {
        const { watchlist } = get();
        if (!watchlist.some((item) => item.id === movie.id)) {
          set({ watchlist: [movie, ...watchlist] });
        }
      },

      removeFromWatchlist: (movieId) => {
        const { watchlist } = get();
        set({ watchlist: watchlist.filter((movie) => movie._id !== movieId) });
      },

      setTotalPages: (num) => set({ totalPages: num }),

      setTotalMovies: (num) => set({ totalMovies: num }),
    }),
    {
      name: "movie-app-storage",
      partialize: (state) => ({
        user: state.user,
        watchlist: state.watchlist,
      }),
    },
  ),
);

export default useStore;
