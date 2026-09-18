'use client';

import { useSyncExternalStore } from 'react';

// false during SSR/hydration, true once React is running on the client.
const subscribe = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

export default function LoadingScreen() {
  const isMounted = useIsMounted();

  if (isMounted) return null;

  return (
    <div className='fixed top-0 left-0 size-full bg-muted z-50 flex items-center justify-center'>
      <div className='flex items-center gap-3'>
        <span className='block size-5 animate-bounce duration-900 rounded-full bg-primary-foreground' />
        <span className='block size-5 animate-bounce duration-700 rounded-full bg-primary-foreground' />
        <span className='block size-5 animate-bounce duration-300 rounded-full bg-primary-foreground' />
      </div>
    </div>
  );
}
