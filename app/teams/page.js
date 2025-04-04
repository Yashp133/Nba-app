'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`https://www.balldontlie.io/api/v1/teams`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });
        const data = await res.json();
        setTeams(data.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [apiKey]);

  return (
    <div className="min-h-screen bg-primary text-white p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">NBA Teams</h1>

      {loading ? (
        <p>Loading teams...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <div key={team.id} className="p-4 border rounded bg-secondary shadow">
              <h2 className="text-xl font-bold">{team.full_name}</h2>
              <p>Abbreviation: {team.abbreviation}</p>
              <p>City: {team.city}</p>
              <p>Conference: {team.conference}</p>
              <p>Division: {team.division}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
