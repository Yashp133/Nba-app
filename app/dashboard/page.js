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
    } catch (err) {
      console.error('Invalid token');
      localStorage.removeItem('jwt');
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-primary text-white p-4">
      <Navbar />
      <h1 className="text-3xl font-bold">Welcome, {user?.username}</h1>
    </div>
  );
}
