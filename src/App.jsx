import React, { useEffect, useState } from "react";

import "./App.css";
import Navbar, { Search, SearchResult } from "./component/Navbar";
import CharacterList from "./component/CharacterList";
import CharacterDetail from "./component/CharacterDetail";
import { allCharacters, character } from "../data/data";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function App() {
  const [character, setCharacters] = useState(allCharacters);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setquery] = useState("");
  const [selcetId, setSelectedID] = useState(null);

  const handleSelectchar = (id) => {
    setSelectedID((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );

        setCharacters(data.results);
      } catch (err) {
        setCharacters([]);
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query]);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setquery={setquery} />
        <SearchResult character={character} isLoading={isLoading} />
      </Navbar>
      <div className="main">
        <CharacterList
          selcetId={selcetId}
          characters={character}
          isLoading={isLoading}
          OnselectCharacter={handleSelectchar}
        />
        <CharacterDetail selcetId={selcetId}></CharacterDetail>
      </div>
    </div>
  );
}
