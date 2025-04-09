'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.decode(token);
        setIsLoggedIn(true);
        setUsername(decoded?.username || '');
      } catch {
        console.error('Invalid token');
        setIsLoggedIn(false);
        setUsername('');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    router.push('/');
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white text-black shadow-md">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold tracking-wide">
        NBA
      </Link>

      {/* Links */}
      <div className="flex space-x-6 text-base items-center">
        <Link href="/teams" className="hover:text-blue-600">Teams</Link>
        <Link href="/players" className="hover:text-blue-600">Players</Link>
        <Link href="/games" className="hover:text-blue-600">Games</Link>
        <Link href="/favorites" className="hover:text-blue-600">Favorites</Link>
        <Link href="/settings" className="hover:text-blue-600">Settings</Link>

        {isLoggedIn ? (
          <>
            <span className="text-green-600 font-semibold">Hi, {username}</span>
            <button onClick={handleLogout} className="text-red-600 hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/register" className="text-red-600 hover:underline">Register</Link>
            <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
