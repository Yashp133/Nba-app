// components/RouteGuard.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../utils/favoritesAtom';
import { searchHistoryAtom } from '../utils/searchAtom';
import { getFavorites, getHistory } from '../utils/userData';

const PUBLIC_PATHS = ['/login', '/register']; 

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [, setFavorites] = useAtom(favoritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  function updateAtoms() {
    const favs = getFavorites();
    const history = getHistory();
    setFavorites(favs);
    setSearchHistory(history);
  }

  useEffect(() => {
    updateAtoms();

    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token');
    const pathIsPublic = PUBLIC_PATHS.includes(router.pathname);
    if (!isLoggedIn && !pathIsPublic) {   
      router.push('/login');
      return;
    }
  }, [router.pathname]);

  return children;
}
