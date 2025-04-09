'use client';
import { useEffect, useState } from 'react';

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
          const exists = (data[category] || []).some(fav => fav.id === item.id);
          setAdded(exists);
        }
      } catch (err) {
        console.error('Check favorite failed:', err);
      }
    };

    checkFavorite();
  }, [category, item]);

  const handleClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in.');
      return;
    }

    const url = added ? '/api/favorites/delete' : '/api/favorites/add';
    const body = added
      ? { category, itemId: item.id }
      : { category, item };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setAdded(!added);
      }
    } catch (err) {
      console.error('Favorite toggle failed:', err);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isLoggedIn}
      style={{
        marginTop: '0.5rem',
        padding: '0.6rem 1rem',
        fontWeight: 'bold',
        border: '2px solid',
        borderColor: added ? '#dc3545' : '#0056b3',
        backgroundColor: added ? '#f8f9fa' : '#ffffff',
        color: added ? '#dc3545' : '#0056b3',
        borderRadius: '6px',
        cursor: isLoggedIn ? 'pointer' : 'not-allowed',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={e => {
        e.target.style.backgroundColor = added ? '#e9ecef' : '#cce5ff';
      }}
      onMouseLeave={e => {
        e.target.style.backgroundColor = added ? '#f8f9fa' : '#ffffff';
      }}
    >
      {added ? '★ Added — Click to Remove' : '☆ Add to Favorites'}
    </button>
  );
}
