import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { sectionThemes } from '../data/sectionThemes';

export const useActiveSection = () => {
  const setActiveSection = useStore((s) => s.setActiveSection);
  const setNavTheme = useStore((s) => s.setNavTheme);

  useEffect(() => {
    const sectionIds = sectionThemes.map((st) => st.id);

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          if (currentId) {
            // 1) Update which section is active
            setActiveSection(currentId);

            // 2) Lookup the theme for this section
            const match = sectionThemes.find((st) => st.id === currentId);
            if (match) {
              setNavTheme(match.theme);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      threshold: 0.3, // Adjust as needed
    });

    // Observe each section
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [setActiveSection, setNavTheme]);
};
