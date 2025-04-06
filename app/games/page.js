'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';

export default function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`https://www.balldontlie.io/api/v1/games?per_page=10`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });
        const data = await res.json();
        setGames(data.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [apiKey]);

  return (
    <div className="min-h-screen bg-primary text-white p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">NBA Games</h1>

      {loading ? (
        <p>Loading games...</p>
      ) : (
        <div className="space-y-4">
          {games.map((game) => (
            <div key={game.id} className="p-4 border rounded bg-secondary shadow">
              <p className="text-lg font-semibold">
                {game.home_team.full_name} vs {game.visitor_team.full_name}
              </p>
              <p>
                Score: {game.home_team_score} - {game.visitor_team_score}
              </p>
              <p>Date: {new Date(game.date).toLocaleDateString()}</p>
              <p>Season: {game.season}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
