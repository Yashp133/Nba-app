import { atom, useAtom } from "jotai";
import { useState } from "react";

export const darkModeAtom = atom(true);

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  return (
    <button
      className={`p-2 rounded-xl ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
