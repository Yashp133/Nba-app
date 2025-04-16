// utils/userData.js
// Utility functions to get persisted user data from localStorage

// Get favorites list from localStorage (returns an array)
export function getFavorites() {
    if (typeof window === 'undefined') return [];  // Not in browser (SSR), no data
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];     // Parse stored JSON or return empty array
    } catch (err) {
      console.error("Failed to parse favorites from localStorage", err);
      return [];
    }
  }
  
  // Get search history list from localStorage (returns an array)
  export function getHistory() {
    if (typeof window === 'undefined') return [];  // Not in browser, no data
    try {
      const stored = localStorage.getItem('searchHistory');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Failed to parse search history from localStorage", err);
      return [];
    }
  }
  