'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to view favorites.');
      return;
    }

    try {
      const res = await fetch('/api/favorites/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFavorites(data);
    } catch (err) {
      console.error('Error loading favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  if (!favorites) return <p style={{ textAlign: 'center' }}>No favorites found.</p>;

  return (
    <div style={{ backgroundColor: '#fff', color: '#000', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
          ⭐ My Favorites
        </h1>

        {/* Games */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#007bff' }}>🏀 Games</h2>
          {favorites.games?.length > 0 ? (
            favorites.games.map((game, i) => (
              <div key={i} style={{ background: '#f5f5f5', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
                <strong>{game.teams?.home?.name} vs {game.teams?.visitors?.name}</strong>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  Date: {game.date?.start?.slice(0, 10)} | Season: {game.season}
                </p>
              </div>
            ))
          ) : <p style={{ color: '#999' }}>No games saved.</p>}
        </section>

        {/* Players */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#e60000' }}>👤 Players</h2>
          {favorites.players?.length > 0 ? (
            favorites.players.map((p, i) => (
              <div key={i} style={{ background: '#f5f5f5', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
                <strong>{p.firstname} {p.lastname}</strong>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  Position: {p.leagues?.standard?.pos || 'N/A'} | Team: {p.team?.name || 'N/A'}
                </p>
              </div>
            ))
          ) : <p style={{ color: '#999' }}>No players saved.</p>}
        </section>

        {/* Teams */}
        <section>
          <h2 style={{ fontSize: '1.5rem', color: '#007bff' }}>🏆 Teams</h2>
          {favorites.teams?.length > 0 ? (
            favorites.teams.map((t, i) => (
              <div key={i} style={{ background: '#f5f5f5', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
                <strong>{t.name}</strong>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  City: {t.city} | Conference: {t.leagues?.standard?.conference}
                </p>
              </div>
            ))
          ) : <p style={{ color: '#999' }}>No teams saved.</p>}
        </section>
      </div>
    </div>
  );
}
