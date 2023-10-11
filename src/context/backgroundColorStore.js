import { create } from 'zustand';

const useBackgroundColorStore = create((set) => ({
	backgroundColor: '#006cf8',
	setBackgroundColor: (color) => set({ backgroundColor: color }),
}));

export { useBackgroundColorStore };
