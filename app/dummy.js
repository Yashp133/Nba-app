'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Image from "next/image";

export default function Home() {
  const [games, setGames] = useState([]);

  const teamLogos = {
    "atl": "atlanta_hawks.png",
    "bos": "boston_celtics.png",
    "brooklyn": "brooklyn_nets.png",
    "cha": "charlotte_hornets.png",
    "chi": "chicago_bulls.png",
    "cle": "cleveland_cavaliers.png",
    "dal": "dallas_mavericks.png",
    "den": "denver_nuggets.png",
    "det": "detroit_pistons.png",
    "gsw": "golden_state_warriors.png",
    "hou": "houston_rockets.png",
    "ind": "indiana_pacers.png",
    "lac": "la_clippers.png",
    "lakers": "los_angeles_lakers.png",
    "mem": "memphis_grizzlies.png",
    "mia": "miami_heat.png",
    "mil": "milwaukee_bucks.png",
    "min": "minnesota_timberwolves.png",
    "no": "new_orleans_pelicans.png",
    "nyk": "new_york_knicks.png",
    "okc": "oklahoma_city_thunder.png",
    "orlando": "orlando_magic.png",
    "phi": "philadelphia_76ers.png",
    "phoenix": "phoenix_suns.png",
    "portland": "portland_trail_blazers.png",
    "sac": "sacramento_kings.png",
    "san": "san_antonio_spurs.png",
    "tor": "toronto_raptors.png",
    "utah": "utah_jazz.png",
    "wash": "washington_wizards.png",
  };

  useEffect(() => {
    const fetchGames = async () => {
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      const res = await fetch(`/api/game?start_date=${lastWeek.toISOString().split('T')[0]}&end_date=${today.toISOString().split('T')[0]}`);
      const data = await res.json();
      setGames(data || []);
    };
    fetchGames();
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Navbar */}
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
        <h1 className="text-5xl font-bold text-black mb-4">🏀 NBA Central Hub</h1>
        <p className="text-lg text-gray-600 mb-6">Live scores, player stats, and headlines — all in one place</p>
        <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-blue-600 transition">Explore Now</button>
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
      <div className="border border-white p-4">
          <h2 className="text-xl font-semibold mb-4">Last 3 Games Played This Season</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-600">
                <th className="py-2 pr-6">Home Team</th>
                <th className="py-2 pr-6">Visitor Team</th>
                <th className="py-2 px-2">Score</th>
                <th className="py-2 px-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {games.length > 0 ? (
                games.map((game, index) => {
                  // Get team logos dynamically
                  const homeTeamLogo = teamLogos[game.home_team.abbreviation.toLowerCase()];
                  const visitorTeamLogo = teamLogos[game.visitor_team.abbreviation.toLowerCase()];

                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-secondary/30"
                    >
                      <td className="py-2 pr-6">
                        <div className="flex items-center">
                          <img
                            src={`/logos/${homeTeamLogo}`} // Dynamically load the home team logo
                            alt={game.home_team.full_name}
                            className="w-6 h-6 mr-2" // Ensure consistent size for logos
                          />
                          {game.home_team.full_name}
                        </div>
                      </td>
                      <td className="py-2 pr-6">
                        <div className="flex items-center">
                          <img
                            src={`/logos/${visitorTeamLogo}`} // Dynamically load the visitor team logo
                            alt={game.visitor_team.full_name}
                            className="w-6 h-6 mr-2" // Ensure consistent size for logos
                          />
                          {game.visitor_team.full_name}
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        {game.home_team_score} - {game.visitor_team_score}
                      </td>
                      <td className="py-2 px-2">
                        {new Date(game.date).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="py-2 text-center text-gray-400">
                    Loading recent games...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


    </div>
  );
}
