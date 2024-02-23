import { useState, useEffect } from "react";

export function useLocalStorageState(initialValue, key) {
  const [watched, setWatched] = useState(function () {
    const storedMovies = localStorage.getItem(key);
    return storedMovies ? JSON.parse(storedMovies) : initialValue;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(watched));
    },
    [watched, key]
  );
  return [watched, setWatched];
}
