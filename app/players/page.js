"use client";
import { useState } from "react";
import Navbar from "@/components/navbar";

const RAPID_API_KEY = "e8434fb59emsh8d5b49690eb5083p1c39e3jsnded0e4cb31b1";
const BASE_URL = "https://api-nba-v1.p.rapidapi.com";

const headers = {
  "X-RapidAPI-Key": RAPID_API_KEY,
  "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
};

export default function PlayersPage() {
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(false);

  const playersPerPage = 5;

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setPage(1);

    const query = search.trim().toLowerCase();

    try {
      let fetchedPlayers = [];

      // If the query is a number, try fetching by playerId
      if (!isNaN(query)) {
        const res = await fetch(`${BASE_URL}/players?id=${query}`, { headers });
        const data = await res.json();
        const player = data.response;
        //console.log("PLAYER FOUND WITH ID!", player);
        if (player && player.nba?.pro !== 0) {
          fetchedPlayers = player; // wrap in array to match rest of logic
          //console.log("FETCHED PLAYERS IS ", fetchedPlayers);
        }
      } else {
        // Otherwise, search by name and filter manually
        //const res = await fetch(`${BASE_URL}/players?search=${query}`, { headers });
        const res = await fetch(`${BASE_URL}/players?search=${query}`, {
          headers,
        });
        const data = await res.json();
        const results = data.response || [];
        //console.log("ALL PLAYERS!", results);

        fetchedPlayers = results.filter(
          (player) =>
            (player.firstname?.toLowerCase().includes(query) ||
              player.lastname?.toLowerCase().includes(query)) &&
            player.nba?.pro !== 0
        );
      }

      setPlayers(fetchedPlayers);
    } catch (err) {
      console.error("Error fetching players:", err);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  const paginatedPlayers = players.slice(
    (page - 1) * playersPerPage,
    page * playersPerPage
  );

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", color: "#000" }}>
      <Navbar />
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
          🏀 NBA <span style={{ color: "#007bff" }}>Players</span>
        </h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            width: "250px",
            marginRight: "1rem",
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
            borderRadius: "4px",
          }}
        >
          Search
        </button>

        {loading ? (
          <p style={{ marginTop: "2rem" }}>Loading players...</p>
        ) : paginatedPlayers.length === 0 ? (
          <p style={{ marginTop: "2rem", color: "#888" }}>No players found.</p>
        ) : (
          <div style={{ marginTop: "2rem" }}>
            {paginatedPlayers.map((player, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#f1f1f1",
                  borderRadius: "10px",
                  padding: "1rem",
                  marginBottom: "1.5rem",
                  maxWidth: "600px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  cursor: "pointer",
                }}
                onClick={() => setExpanded(expanded === idx ? null : idx)}
              >
                <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  <span style={{ color: "red" }}>{player.firstname}</span>{" "}
                  <span style={{ color: "#007bff" }}>{player.lastname}</span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#333",
                    marginTop: "0.3rem",
                  }}
                ></div>
                {expanded === idx && (
                  <div style={{ marginTop: "0.7rem", fontSize: "0.95rem" }}>
                    <p>Player ID: {player.id || "N/A"}</p>
                    <p>Height: {player.height?.meters || "N/A"} m</p>
                    <p>Weight: {player.weight?.kilograms || "N/A"} kg</p>
                    <p>Birthday: {player.birth?.date || "N/A"} </p>
                    <p>
                      Position: {player.leagues?.standard?.pos || "N/A"} |
                      Jersey: {player.leagues?.standard?.jersey || "N/A"}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {players.length > 0 && (
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                backgroundColor: "#ff4d4d",
                border: "none",
                padding: "0.5rem 1rem",
                color: "#fff",
                borderRadius: "5px",
              }}
            >
              Previous
            </button>
            <span style={{ fontSize: "1rem" }}>Page {page}</span>
            <button
              onClick={() =>
                setPage((p) =>
                  p * playersPerPage < players.length ? p + 1 : p
                )
              }
              disabled={page * playersPerPage >= players.length}
              style={{
                backgroundColor: "#007bff",
                border: "none",
                padding: "0.5rem 1rem",
                color: "#fff",
                borderRadius: "5px",
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
