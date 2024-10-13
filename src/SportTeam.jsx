import React, { useState } from 'react';

const myFavoriteFootballTeam = {
  team: "Argentina",
  sport: "Football",
  year: 1986,
  isWorldCupWinner: true,
  headCoach: {
    coachName: "Carlos Bilardo",
    matches: 7,
  },
  players: [
    {
      name: "Sergio Almirón",
      position: "forward",
      number: 1,
      isCaptain: false,
      nickname: null,
    },
    {
      name: "Sergio Batista",
      position: "midfielder",
      number: 2,
      isCaptain: false,
      nickname: null,
    },
    {
      name: "Ricardo Bochini",
      position: "midfielder",
      number: 3,
      isCaptain: false,
      nickname: "El Bocha",
    },
    {
      name: "Claudio Borghi",
      position: "midfielder",
      number: 4,
      isCaptain: false,
      nickname: "Bichi",
    },
    {
      name: "José Luis Brown",
      position: "defender",
      number: 5,
      isCaptain: false,
      nickname: "Tata",
    },
    {
      name: "Daniel Passarella",
      position: "defender",
      number: 6,
      isCaptain: false,
      nickname: "El Gran Capitán",
    },
    {
      name: "Diego Maradona",
      position: "midfielder",
      number: 10,
      isCaptain: true,
      nickname: "El Pibe de Oro",
    },
    // Additional players...
  ],
};

const TeamComponent = () => {
  const { sport, team, year, players } = myFavoriteFootballTeam;
  const { coachName } = myFavoriteFootballTeam.headCoach;

  const [filteredPlayers, setFilteredPlayers] = useState(players);

  const setPlayerCards = (filterFunc) => {
    if (filterFunc) {
      setFilteredPlayers(players.filter(filterFunc));
    } else {
      setFilteredPlayers(players);
    }
  };

  const handleDropdownChange = (e) => {
    switch (e.target.value) {
      case "nickname":
        setPlayerCards((player) => player.nickname !== null);
        break;
      case "forward":
        setPlayerCards((player) => player.position === "forward");
        break;
      case "midfielder":
        setPlayerCards((player) => player.position === "midfielder");
        break;
      case "defender":
        setPlayerCards((player) => player.position === "defender");
        break;
      case "goalkeeper":
        setPlayerCards((player) => player.position === "goalkeeper");
        break;
      default:
        setPlayerCards();
    }
  };

  return (
    <div>
      <h1>{team}</h1>
      <p>Sport: {sport}</p>
      <p>World Cup Year: {year}</p>
      <p>Head Coach: {coachName}</p>

      <select onChange={handleDropdownChange}>
        <option value="">All Players</option>
        <option value="nickname">With Nickname</option>
        <option value="forward">Forwards</option>
        <option value="midfielder">Midfielders</option>
        <option value="defender">Defenders</option>
        <option value="goalkeeper">Goalkeepers</option>
      </select>

      <div id="player-cards">
        {filteredPlayers.map(({ name, position, number, isCaptain, nickname }) => (
          <div key={number} className="player-card">
            <h2>{isCaptain ? "(Captain)" : ""} {name}</h2>
            <p>Position: {position}</p>
            <p>Number: {number}</p>
            <p>Nickname: {nickname || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamComponent;
