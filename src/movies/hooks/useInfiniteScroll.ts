import { useEffect, useRef } from "react";

export const useInfiniteScroll = (callback: () => void) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, { threshold: 0.5 });

    observerRef.current.observe(loaderRef.current);

    return () => observerRef.current?.disconnect();
  }, [callback]);

  return loaderRef;
};
