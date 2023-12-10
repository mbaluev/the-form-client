import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  load as loadIntercom,
  boot as bootIntercom,
  update as updateIntercom,
} from '@utils/intercom/intercom';

export const IntercomProvider = ({ children }: PropsWithChildren<any>) => {
  const { events } = useRouter();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (typeof window !== 'undefined') {
        loadIntercom();
        bootIntercom();
      }
    }, 10000);
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== 'undefined') {
        updateIntercom();
      }
    };

    events.on('routeChangeStart', handleRouteChange);

    return () => {
      events.off('routeChangeStart', handleRouteChange);
    };
  }, [events]);

  return children;
};
