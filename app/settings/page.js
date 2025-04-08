'use client';
import Navbar from '@/components/navbar';

export default function Settings() {
  return (
    <div className="min-h-screen bg-primary text-white p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Settings</h1>

      <div className="space-y-4">
        <div className="p-4 bg-secondary rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Appearance</h2>
        </div>

        <div className="p-4 bg-secondary rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Account</h2>
          <p>Currently no login required for using the app.</p>
        </div>
      </div>
    </div>
  );
}
