import { useEffect, useRef, Dispatch, SetStateAction, RefObject } from 'react';

export const useOutsideClick = (
  handler: Dispatch<SetStateAction<void>>,
  listenCapturing = true
) => {
  const ref: RefObject<HTMLElement> = useRef(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Element)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick, listenCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
};
