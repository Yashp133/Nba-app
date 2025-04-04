"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import "../styles/globals.css"

export default function Home() {
  const [games, setGames] = useState([]);

  // Define the team logos object
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
      try {
        // Get today's date and the date from a week ago
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);

        // Format the dates to YYYY-MM-DD format
        const todayFormatted = today.toISOString().split("T")[0];
        const lastWeekFormatted = lastWeek.toISOString().split("T")[0];

        const res = await fetch(
          `/api/game?start_date=${lastWeekFormatted}&end_date=${todayFormatted}` // Pass the date range to the backend
        );

        console.log("API Response Status:", res.status); // Check response status
        
        if (!res.ok) {
          throw new Error("Failed to fetch games data");
        }

        const data = await res.json();
        console.log("Fetched games data:", data);

        if (data && data.length > 0) {
          setGames(data);
        } else {
          console.error("No games data found");
        }
      } catch (err) {
        console.error("Error fetching recent games:", err);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-primary text-white px-4 py-8">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 items-center gap-10 mt-5">NBA App</h1>
      <p className="text-lg items-center">Stay updated with NBA teams, players, and games!</p>
      <div className="flex flex-col justify-center items-center gap-12 mt-12">
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
    </div>
  );
}
