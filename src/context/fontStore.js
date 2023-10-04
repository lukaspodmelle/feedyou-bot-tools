import { create } from 'zustand';

const fonts = [
	{ name: 'Manrope', weight: '300' },
	{ name: 'Montserrat', weight: '300' },
	{ name: 'Inter', weight: '300' },
	{ name: 'Playfair Display', weight: '700' },
	{ name: 'Libre Baskerville', weight: '300' },
];

const useFontStore = create((set) => ({
	selectedFont: fonts[0],
	setSelectedFont: (font) => set({ selectedFont: font }),
}));

export { useFontStore, fonts };
