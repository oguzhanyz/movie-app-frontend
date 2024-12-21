import { useEffect, useState } from "react";
import useStore from "../hooks/useStore";

export function useSearchMovies(query) {
  const user = useStore((state) => state.user);
  const setSearchResults = useStore((state) => state.setSearchResults);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://127.0.0.1:3000/api/search?title=${query}`,
          {
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Something went wrong.");
        }

        const data = await res.json();

        setSearchResults(data);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query, user.token, setSearchResults]);

  return { isLoading, error };
}
