'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(`https://www.balldontlie.io/api/v1/players?per_page=10`, {
          headers: {
            'Authorization': `Bearer ${apiKey}` 
          }
        });
        const data = await res.json();
        setPlayers(data.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [apiKey]);

  return (
    <div className="min-h-screen bg-primary text-white p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Players</h1>

      {loading ? (
        <p>Loading players...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {players.map((player) => (
            <div key={player.id} className="p-4 border rounded bg-secondary shadow">
              <h2 className="text-xl font-semibold">
                {player.first_name} {player.last_name}
              </h2>
              <p>Team: {player.team.full_name}</p>
              <p>Position: {player.position || 'N/A'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
