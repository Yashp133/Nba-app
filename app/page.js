"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Image from "next/image";
import teamLogos from "@/utils/teamLogo";


export default function Home() {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 3;

  useEffect(() => {
    const fetchGames = async () => {
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      const res = await fetch(
        `/api/game?start_date=${lastWeek.toISOString().split("T")[0]}&end_date=${today.toISOString().split("T")[0]}`
      );
      const data = await res.json();
      setGames(data || []);
    };
    fetchGames();
  }, []);

  const totalPages = Math.ceil(games.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const currentGames = games.slice(startIndex, startIndex + gamesPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* Schedule ticker */}
      <div className="w-full bg-blue-100 overflow-x-auto whitespace-nowrap py-2 px-4 text-sm text-blue-800 font-medium border-b border-blue-300">
        {games.length > 0 ? (
          games.slice(0, 10).map((game, index) => (
            <span key={index} className="mr-6 inline-block">
              {game.home_team.abbreviation} vs {game.visitor_team.abbreviation} — {game.home_team_score}:{game.visitor_team_score}
            </span>
          ))
        ) : (
          <span>Loading schedule...</span>
        )}
      </div>

      {/* Hero */}
<section className="text-center py-16 border-b border-gray-200">
  <h1 className="text-5xl font-extrabold mb-4 flex justify-center items-center gap-3">
    <span>🏀</span>
    <span className="text-red-600">NBA</span>
    <span className="text-black">Central</span>
    <span className="text-blue-600">Hub</span>
  </h1>
  <p className="text-xl font-semibold text-blue-600 italic tracking-wide mb-6 animate-pulse">
  Live scores, player stats, and headlines — all in one place
</p>

</section>


      {/* MVP Section */}
      <div className="flex flex-col items-center text-center border border-white p-4">
        <h2 className="text-2xl font-semibold mb-4">🏆 Reigning MVP</h2>
        <Image
          src="https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png"
          alt="Nikola Jokic"
          width={200}
          height={200}
          className="rounded-full border-4 border-gray-700"
        />
        <p className="text-xl font-semibold mt-4">Nikola Jokić</p>
        <p className="text-sm text-gray-300">Denver Nuggets</p>
        <p className="text-sm text-gray-400">2023–24 Season</p>
      </div>

      {/* Recent Games Section */}
      <section className="px-6 py-12 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6"> Recent Games This Season</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="py-3 px-4 text-left">Home Team</th>
                <th className="py-3 px-4 text-left">Visitor Team</th>
                <th className="py-3 px-4 text-left">Score</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentGames.length > 0 ? (
                currentGames.map((game, index) => {
                  const homeTeamLogo = teamLogos[game.home_team.abbreviation.toLowerCase()];
                  const visitorTeamLogo = teamLogos[game.visitor_team.abbreviation.toLowerCase()];

                  return (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img src={`/logos/${homeTeamLogo}`} alt={game.home_team.full_name} className="w-6 h-6 mr-2" />
                          {game.home_team.full_name}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img src={`/logos/${visitorTeamLogo}`} alt={game.visitor_team.full_name} className="w-6 h-6 mr-2" />
                          {game.visitor_team.full_name}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {game.home_team_score} - {game.visitor_team_score}
                      </td>
                      <td className="py-3 px-4">{new Date(game.date).toLocaleDateString()}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
                    Loading recent games...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {games.length > gamesPerPage && (
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
