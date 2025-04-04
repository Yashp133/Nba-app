import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-primary text-white">
      <Link href="/" className="text-xl font-bold">NBA App</Link>
      <div>
        <Link href="/teams" className="mx-4">Teams</Link>
        <Link href="/players" className="mx-4">Players</Link>
        <Link href="/games" className="mx-4">Games</Link>
        <Link href="/favorites" className="mx-4">Favorites</Link>
        <Link href="/settings" className="mx-4">Settings</Link>
      </div>
    </nav>
  );
}