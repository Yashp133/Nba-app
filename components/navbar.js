import Link from "next/link";

export default function Navbar() {
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
        <Link href="/signup" className="text-red-600 hover:underline">Sign Up</Link>
        <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
      </div>
    </nav>
  );
}
