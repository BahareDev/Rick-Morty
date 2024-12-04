import React, { Children, useState } from "react";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { Character } from "./CharacterList";

export default function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return <div className="navbar__logo">LOGO 😍</div>;
}

export function Search({ query, setquery }) {
  return (
    <input
      value={query}
      onChange={(e) => setquery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
    />
  );
}

export function SearchResult({ numOfresult, data }) {
  return <div className="navbar__result">Found {numOfresult} Character</div>;
}

export function Favourites({ favourites, onDeleteFav, data }) {
  const [close, setIsClose] = useState(false);
  return (
    <>
      <Modal onOpen={setIsClose} open={close} title="List of Fav">
        {favourites.map((item) => (
          <Character key={item.id} item={item}>
            <button className="icon red" onClick={() => onDeleteFav(item.id)}>
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsClose(true)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
}
