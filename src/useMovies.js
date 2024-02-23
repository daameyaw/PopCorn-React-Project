import { useState, useEffect } from "react";

const KEY = "393d4d1b";

export function useMovies(query, calback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const respond = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!respond.ok) throw new Error("Something went wrong");

          const data = await respond.json();

          if (data.Response === "False") throw new Error("Movie not found");

          console.log(data);
          setMovies(data.Search);
          setError("");
        } catch (error) {
          console.error(error.message);

          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      calback?.();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
