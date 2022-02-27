import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ResetPagePosition(pathname: string) {
  pathname = useLocation().pathname;

  useEffect(() => {
    // RESET PAGE POSITION
    window.scrollTo(0, 0);
  }, [pathname]);
}
