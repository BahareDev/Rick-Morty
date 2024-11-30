import { EyeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { allCharacters } from "../../data/data";
import { EyeSlashIcon } from "@heroicons/react/20/solid";

export default function CharacterList({
  characters,
  isLoading,
  OnselectCharacter,
  selcetId,
}) {
  if (isLoading) {
    return (
      <div className="characters-list">
        <p>data is loading ...</p>
      </div>
    );
  }
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character
          key={item.id}
          item={item}
          OnselectCharacter={OnselectCharacter}
          selcetId={selcetId}
        />
      ))}
    </div>
  );
}

function Character({ item, OnselectCharacter, selcetId }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      <button className="icon red" onClick={() => OnselectCharacter(item.id)}>
        {selcetId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👨" : "👩"}</span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>

      <span> {item.status} </span>
      <span> - {item.species}</span>
    </div>
  );
}
