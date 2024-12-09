import React, { useEffect, useState } from "react";

import "./App.css";
import Navbar, { Favourites, Search, SearchResult } from "./component/Navbar";
import CharacterList from "./component/CharacterList";
import CharacterDetail from "./component/CharacterDetail";
import { Toaster } from "react-hot-toast";
import { useCharacters } from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [query, setquery] = useState("");
  const { isLoading, character } = useCharacters(
    "https://rickandmortyapi.com/api/character",
    query
  );

  const [selcetId, setSelectedID] = useState(null);
  const [favourite, setFavourites] = useLocalStorage("favourite", []);

  const handleSelectchar = (id) => {
    setSelectedID((prevId) => (prevId === id ? null : id));
  };

  const handleFav = (char) => {
    setFavourites((prevFav) => [...prevFav, char]);
  };

  const handleDeleteFav = (id) => {
    setFavourites(favourite.filter((fav) => fav.id != id));
  };

  const isAddFav = favourite.map((item) => item.id).includes(selcetId);

  return (
    <div className="app">
      <Toaster />

      <Navbar>
        <Search query={query} setquery={setquery} />
        <SearchResult character={character} isLoading={isLoading} />
        <Favourites favourites={favourite} onDeleteFav={handleDeleteFav} />
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
