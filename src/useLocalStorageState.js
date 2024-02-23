import { useState } from "react";

export function useLocalStorageState(initialState) {
  const [value, setValue] = useState(function () {
    const storedMovies = localStorage.getItem("watched");
    return JSON.parse(storedMovies);
  });
}
