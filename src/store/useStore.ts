import { create } from 'zustand';

interface AppState {
  // For mobile nav
  isMobileNavOpen: boolean;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;

  // Active section ID
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Current nav theme: 'dark' => text is white, 'light' => text is black
  navTheme: 'dark' | 'light';
  setNavTheme: (theme: 'dark' | 'light') => void;
}

export const useStore = create<AppState>((set) => ({
  // Mobile menu
  isMobileNavOpen: false,
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  closeMobileNav: () => set(() => ({ isMobileNavOpen: false })),

  // Active section
  activeSection: 'home',
  setActiveSection: (section) => set(() => ({ activeSection: section })),

  // Nav theme
  navTheme: 'dark', // default to dark
  setNavTheme: (theme) => set(() => ({ navTheme: theme })),
}));