"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";

const RAPID_API_KEY = "e8434fb59emsh8d5b49690eb5083p1c39e3jsnded0e4cb31b1";
const BASE_URL = "https://api-nba-v1.p.rapidapi.com";

const headers = {
  "X-RapidAPI-Key": RAPID_API_KEY,
  "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
};

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [expandedGameId, setExpandedGameId] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const gamesPerPage = 5;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`${BASE_URL}/teams`, { headers });
        const data = await res.json();
        setTeams(data.response || []);
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };
    fetchTeams();
  }, []);

  const handleSearch = async () => {
    const query = search.trim().toLowerCase();
    if (!query) {
      setSearchPerformed(true);
      setGames([]);
      return;
    }

    setLoading(true);
    setSearchPerformed(true);

    try {
      const found = teams.find(
        (team) =>
          team.id?.toString() === query ||
          team.name?.toLowerCase().includes(query) ||
          team.nickname?.toLowerCase().includes(query)
      );

      if (!found) {
        setGames([]);
        setLoading(false);
        return;
      }

      const season = 2024;
      const res = await fetch(
        `${BASE_URL}/games?season=${season}&team=${found.id}`,
        { headers }
      );
      const data = await res.json();
      setGames(data.response || []);
      console.log("DATA RESPONSE IS ", data.response);
    } catch (err) {
      console.error("Error fetching games:", err);
      setGames([]);
    } finally {
      setLoading(false);
      setPage(1);
    }
  };

  const paginatedGames = games.slice(
    (page - 1) * gamesPerPage,
    page * gamesPerPage
  );

  const toggleGameDetails = (gameId) => {
    setExpandedGameId((prev) => (prev === gameId ? null : gameId));
  };

  return (
    <div style={{ backgroundColor: "#fff", color: "#000", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ textAlign: "center", paddingTop: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>🏀 NBA Games</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter team name..."
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            marginRight: "0.5rem",
            width: "250px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Search
        </button>

        {loading ? (
          <p style={{ marginTop: "2rem" }}>Loading games...</p>
        ) : paginatedGames.length === 0 && searchPerformed ? (
          <p style={{ marginTop: "2rem" }}>No games found.</p>
        ) : (
          <div style={{ marginTop: "2rem" }}>
            {paginatedGames.map((game, idx) => (
              <div
                key={idx}
                onClick={() => toggleGameDetails(game.id)}
                style={{
                  background: "#f2f2f2",
                  margin: "1rem auto",
                  padding: "1rem",
                  maxWidth: "600px",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  textAlign: "left",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <strong style={{ fontSize: "1.1rem" }}>
                  <span style={{ color: "red" }}>{game.teams.home.name}</span>{" "}
                  vs{" "}
                  <span style={{ color: "blue" }}>
                    {game.teams.visitors.name}
                  </span>
                </strong>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  Final · {game.date.start.slice(0, 10)} · Season {game.season}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {game.scores.home.points}
                  </span>{" "}
                  -{" "}
                  <span style={{ color: "blue", fontWeight: "bold" }}>
                    {game.scores.visitors.points}
                  </span>
                </p>
                {expandedGameId === game.id && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.9rem",
                      color: "#444",
                    }}
                  >
                    <p>
                      <strong>Status:</strong> {game.status.long}
                    </p>
                    <p>
                      <strong>Arena:</strong> {game.arena?.name || "N/A"}
                    </p>
                    <p>
                      <strong>City:</strong> {game.arena?.city || "N/A"}
                    </p>
                    <p>
                      <strong>League:</strong> {game.league.name}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {games.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                backgroundColor: "#ff3b30",
                color: "#fff",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "5px",
                marginRight: "1rem",
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={() =>
                setPage((p) => (p * gamesPerPage < games.length ? p + 1 : p))
              }
              disabled={page * gamesPerPage >= games.length}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "5px",
                marginLeft: "1rem",
                cursor:
                  page * gamesPerPage >= games.length
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
