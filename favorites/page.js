'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('nba-favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-primary text-white p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">My Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet. Go to players or teams page and add some!</p>
      ) : (
        <div className="space-y-4">
          {favorites.map((fav, index) => (
            <div
              key={index}
              className="p-4 border rounded bg-secondary shadow"
            >
              <p className="text-lg font-semibold">{fav.type.toUpperCase()}</p>
              <p>Name: {fav.name}</p>
              {fav.extra && <p>{fav.extra}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
