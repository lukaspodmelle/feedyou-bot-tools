import { create } from 'zustand';

const useMenuStore = create((set) => ({
	isMenuOpen: false,
	setIsMenuOpen: (value) => set({ isMenuOpen: value }),
	toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));

export { useMenuStore };
