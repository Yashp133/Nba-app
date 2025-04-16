"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import teamLogos from "@/utils/teamLogo";
import FavoriteButton from '@/components/FavoriteButton';

const RAPID_API_KEY = "e8434fb59emsh8d5b49690eb5083p1c39e3jsnded0e4cb31b1";
const BASE_URL = "https://api-nba-v1.p.rapidapi.com";
const headers = {
  "X-RapidAPI-Key": RAPID_API_KEY,
  "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
};

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState({});
  const teamsPerPage = 5;
  const [search, setSearch] = useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`${BASE_URL}/teams`, { headers });
        const data = await res.json();

        // Filter for NBA franchises only
        const nbaTeams = (data.response || []).filter(
          (team) => team.nbaFranchise
        );
        setTeams(nbaTeams);
        setFilteredTeams(nbaTeams); // initial view shows all
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };

    fetchTeams();
  }, []);

  const paginatedTeams = filteredTeams.slice(
    (page - 1) * teamsPerPage,
    page * teamsPerPage
  );

  const toggleExpand = (teamId) => {
    setExpanded((prev) => ({
      ...prev,
      [teamId]: !prev[teamId],
    }));
  };

  const handleSearch = () => {
    const query = search.trim().toLowerCase();
    setSearchPerformed(true); // Mark that a search was made

    if (!query) {
      setFilteredTeams(teams);
      return;
    }

    const results = teams.filter(
      (team) =>
        team.id?.toString() === query ||
        team.city?.toLowerCase().includes(query) ||
        team.nickname?.toLowerCase().includes(query) ||
        team.fullName?.toLowerCase().includes(query)
    );

    setPage(1);
    setFilteredTeams(results);
  };

  return (
    <div style={{ backgroundColor: "#fff", color: "#000", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ textAlign: "center", paddingTop: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem" }}>
          🏀 <span style={{ color: "#000", fontWeight: "bold" }}>NBA</span>{" "}
          <span style={{ color: "#007bff", fontWeight: "bold" }}>Teams</span>
        </h1>
        <div style={{ marginTop: "1.5rem" }}>
          <input
            type="text"
            placeholder="Search by name or ID"
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
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          {searchPerformed && filteredTeams.length === 0 && (
            <p style={{ color: "#888", fontSize: "1rem", marginTop: "1rem" }}>
              Team not found.
            </p>
          )}

          {paginatedTeams.map((team, idx) => (
            <div
              key={idx}
              style={{
                background: "#f5f5f5",
                margin: "1rem auto",
                padding: "1rem",
                maxWidth: "600px",
                borderRadius: "0.5rem",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // centers all child elements
                textAlign: "center", // text also centered
              }}
              onClick={() => toggleExpand(team.id)}
            >
              <img
                src={`/logos/${
                  teamLogos[team.code?.toLowerCase()] || "default.png"
                }`}
                alt={`${team.fullName} logo`}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "contain",
                  marginBottom: "0.5rem",
                }}
              />

              <div style={{ marginBottom: "0.25rem" }}>
                <strong style={{ color: "red" }}>
                  {team.city || "Unknown"}
                </strong>{" "}
                <strong style={{ color: "#007bff" }}>
                  {team.nickname || "Team"}
                </strong>
              </div>

              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#555",
                  marginBottom: "0.5rem",
                }}
              >
                {team.leagues?.standard?.conference ?? "N/A"} ·{" "}
                {team.leagues?.standard?.division ?? "N/A"}
              </p>

              {expanded[team.id] && (
                <div
                  style={{
                    fontSize: "0.9rem",
                    textAlign: "left", // center expanded details too
                  }}
                >
                  <p>
                    <strong>Team ID:</strong> {team.id}
                  </p>
                  <p>
                    <strong>City:</strong> {team.city}
                  </p>
                  <p>
                    <strong>Short Name:</strong> {team.code}
                  </p>
                  <p>
                    <strong>Nickname:</strong> {team.nickname}
                  </p>
                </div>
              )}
              <FavoriteButton item={team} category="teams" />
            </div>
          ))}
        </div>

        {filteredTeams.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                marginRight: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#ff4d4f",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Previous
            </button>
            <span style={{ fontWeight: "bold" }}>Page {page}</span>
            <button
              onClick={() =>
                setPage((p) =>
                  p * teamsPerPage < filteredTeams.length ? p + 1 : p
                )
              }
              disabled={page * teamsPerPage >= filteredTeams.length}
              style={{
                marginLeft: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
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
