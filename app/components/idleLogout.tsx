import { useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const useIdleLogout = (timeout: number) => {
  const router = useRouter();
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    console.log('Resetting timer');
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = setTimeout(logout, timeout);
  };

  const logout = () => {
    console.log('Logging out');
    Cookies.remove('AUTH');
    router.push('/auth/login');
  };

  useEffect(() => {
    console.log('Setting up idle logout');

    resetTimer();

    const events = ['mousemove', 'keydown', 'scroll', 'touchstart'];

    events.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      console.log('Cleaning up idle logout');
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return null;
};

export default useIdleLogout;
