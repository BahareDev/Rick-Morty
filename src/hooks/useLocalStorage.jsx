import React, { useEffect, useState } from "react";

export default function useLocalStorage(key, initialState) {
  const [item, setItem] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(item));
  }, [item]);
  return [item, setItem];
}
