'use client';
import { useState, useEffect } from 'react';

export default function FavoriteButton({ item, category }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const checkFavorite = async () => {
      if (!token) return;

      try {
        const res = await fetch('/api/favorites/get', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          const favorites = data[category] || [];
          const exists = favorites.some(fav => fav.id === item.id);
          setAdded(exists);
        }
      } catch (err) {
        console.error('Failed to check favorites', err);
      }
    };

    checkFavorite();
  }, [category, item]);

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to add favorites.');
      return;
    }

    const res = await fetch('/api/favorites/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ category, item })
    });

    if (res.ok) {
      setAdded(true);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={!isLoggedIn || added}
      style={{
        marginTop: '0.5rem',
        padding: '0.4rem 0.8rem',
        backgroundColor: added ? '#ccc' : '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      {added ? '★ Added' : '☆ Add to Favorites'}
    </button>
  );
}
