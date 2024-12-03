import React, { useEffect, useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import toast from "react-hot-toast";

export default function CharacterDetail({ selcetId, onAddFav, isAddFav }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setCharacter(null);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selcetId}`
        );

        setCharacter(data);

        const epidosesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${epidosesId}`
        );

        setEpisodes([episodeData].flat());
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selcetId) fetchData();
  }, [selcetId]);

  if (isLoading) return;
  <div style={{ flex: 1 }}> loading... </div>;

  if (!character || !selcetId)
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        please select a character
      </div>
    );

  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        character={character}
        onAddFav={onAddFav}
        isAddFav={isAddFav}
      />
      <EpisodesList episodes={episodes} />
    </div>
  );
}

function CharacterSubInfo({ character, onAddFav, isAddFav }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />

      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👨" : "👩"}</span>
          <span>&nbsp;{character.name} </span>
        </h3>

        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp; {character.status}</span>
          <span>&nbsp; {character.species}</span>
        </div>

        <div className="location">
          <p>Last known location:</p>
          <p>{character.location.name}</p>
        </div>

        <div className="actions">
          {isAddFav ? (
            <p>This is added already</p>
          ) : (
            <button
              onClick={() => onAddFav(character)}
              className="btn btn--primary"
            >
              Add to favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodesList({ episodes }) {
  const [sort, setSortBy] = useState(true);

  let sortedEpisode;
  if (sort) {
    sortedEpisode = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisode = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sort ? "0deg" : "180deg" }}
          />
        </button>
      </div>

      <ul>
        {sortedEpisode.map((item, index) => (
          <li key={item.id}>
            <div className="">
              {String(index + 1).padStart(2, "0")} {item.episode} :{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
