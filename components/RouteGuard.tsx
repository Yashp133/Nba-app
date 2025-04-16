'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const PUBLIC_PATHS = ['/', '/login', '/register'];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isPublic = PUBLIC_PATHS.includes(pathname || '');
    if (!token && !isPublic) {
      router.push('/login');
    }
  }, [pathname]);

  return children;
}
