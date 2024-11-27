import React, { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./component/Navbar";
import CharacterList from "./component/CharacterList";
import CharacterDetail from "./component/CharacterDetail";
import { allCharacters, character } from "../data/data";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function App() {
  const [character, setCharacters] = useState(allCharacters);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/characters"
        );

        setCharacters(data.results);
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="app">
      <Toaster />
      <Navbar numOfresult={character.length} />
      <div className="main">
        <CharacterList characters={character} isLoading={isLoading} />
        <CharacterDetail></CharacterDetail>
      </div>
    </div>
  );
}
