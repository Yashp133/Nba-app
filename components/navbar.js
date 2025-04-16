'use client';
import React from 'react';
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
    <nav className="flex justify-between items-center px-6 py-4 bg-white text-black shadow-md border-b-4 border-blue-600">
      {/* Logo */}
      <Link href="/" className="text-4xl font-extrabold tracking-widest flex items-center gap-1">
        <span className="text-blue-600">N</span>
        <span className="text-black">B</span>
        <span className="text-red-600">A</span>
      </Link>

      {/* Links */}
      <div className="flex flex-wrap items-center gap-6 text-lg font-semibold tracking-wide">
        <Link href="/teams" className="text-black hover:text-blue-600 transition-colors duration-200">Teams</Link>
        <Link href="/players" className="text-black hover:text-blue-600 transition-colors duration-200">Players</Link>
        <Link href="/games" className="text-black hover:text-blue-600 transition-colors duration-200">Games</Link>
        <Link href="/favorites" className="text-black hover:text-red-600 transition-colors duration-200">Favorites</Link>
        <Link href="/settings" className="text-black hover:text-red-600 transition-colors duration-200">Settings</Link>

        {isLoggedIn ? (
          <>
            <span className="text-green-700 font-medium">Hi, {username}</span>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 hover:underline transition-colors duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/register" className="text-red-600 hover:text-red-800 hover:underline transition-colors duration-200">
              Register
            </Link>
            <Link href="/login" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
