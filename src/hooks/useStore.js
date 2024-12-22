import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      searchResults: [],
      watchlist: [],

      reset: () => {
        set({ user: null });
        set({ searchResults: [] });
        set({ watchlist: [] });
      },

      setUser: (user) => set({ user }),

      setSearchResults: (results) => set({ searchResults: results }),

      setWatchlist: (results) => set({ watchlist: results }),

      addToWatchlist: (movie) => {
        const { watchlist } = get();
        if (!watchlist.some((item) => item.id === movie.id)) {
          set({ watchlist: [...watchlist, movie] });
        }
      },
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
