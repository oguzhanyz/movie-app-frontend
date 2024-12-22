import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useStore from "../hooks/useStore";

export function useRetrieveWatchlist() {
  const user = useStore((state) => state.user);
  const setWatchlist = useStore((state) => state.setWatchlist);
  const reset = useStore((state) => state.reset);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMWatchlist() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(`http://127.0.0.1:3000/api/watchlist`, {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          if (data.message === "Token is not valid") {
            reset();
            useStore.persist.clearStorage();
            navigate("/login");
          }
          throw new Error("Something went wrong.");
        }

        setWatchlist(data);
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

    fetchMWatchlist();

    return function () {
      controller.abort();
    };
  }, [user.token, setWatchlist, navigate, reset]);

  return { isLoading, error };
}
