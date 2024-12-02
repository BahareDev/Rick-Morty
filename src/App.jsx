import React, { useEffect, useState } from "react";

import "./App.css";
import Navbar, { Favourites, Search, SearchResult } from "./component/Navbar";
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
  const [favourite, setFavourites] = useState([]);

  const handleSelectchar = (id) => {
    setSelectedID((prevId) => (prevId === id ? null : id));
  };

  const handleFav = (char) => {
    setFavourites((prevFav) => [...prevFav, char]);
  };

  const isAddFav = favourite.map((item) => item.id).includes(selcetId);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );

        setCharacters(data.results);
      } catch (err) {
        // err handeling in clean up function
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    // Clean up Function
    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setquery={setquery} />
        <SearchResult character={character} isLoading={isLoading} />
        <Favourites numOfFavourites={favourite.length} />
      </Navbar>
      <div className="main">
        <CharacterList
          selcetId={selcetId}
          characters={character}
          isLoading={isLoading}
          OnselectCharacter={handleSelectchar}
        />
        <CharacterDetail
          selcetId={selcetId}
          onAddFav={handleFav}
          isAddFav={isAddFav}
        ></CharacterDetail>
      </div>
    </div>
  );
}
