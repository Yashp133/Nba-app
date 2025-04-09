'use client';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'supersecretkey';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwt.verify(token, SECRET);
      setUser(decoded);
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('jwt');
      router.push('/login');
    }

    // If you have an API fetch with error handling, here's how to handle it:
    const fetchData = async () => {
      try {
        const response = await fetch('/api/some-endpoint');
        const data = await response.json();
        // handle data
      } catch (error) {
        console.error('API Error:', error);
        // handle error
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="min-h-screen bg-primary text-white p-4">
      <Navbar />
      <h1 className="text-3xl font-bold">Welcome, {user?.username}</h1>
    </div>
  );
}