import { useEffect } from "react";

export const useViewportAnimations = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "-40px 0px",
      }
    );

    const observed = new Set<Element>();

    const collect = () => {
      document.querySelectorAll("[data-animate]").forEach((node) => {
        if (!observed.has(node)) {
          observed.add(node);
          observer.observe(node);
        }
      });
    };

    collect();
    const mutationObserver = new MutationObserver(collect);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
};
