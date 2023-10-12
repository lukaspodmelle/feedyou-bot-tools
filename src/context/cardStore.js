import { create } from 'zustand';
import fonts from '../assets/fonts';
import phosphorIcons from '../assets/phosphor-icons';

const cardDefaults = {
	backgroundColor: '#006cf8',
	text: '',
	textColor: '#FFFFFF',
	textFont: fonts[0],
	icon: phosphorIcons[0].icon,
	iconColor: '#FFFFFF',
};

const useCardStore = create((set) => ({
	backgroundColor: cardDefaults.backgroundColor,
	text: cardDefaults.text,
	textColor: cardDefaults.textColor,
	textFont: cardDefaults.textFont,
	icon: cardDefaults.icon,
	iconColor: cardDefaults.iconColor,

	setBackgroundColor: (value) => set({ backgroundColor: value }),
	setText: (value) => set({ text: value }),
	setTextColor: (value) => set({ textColor: value }),
	setTextFont: (value) => set({ textFont: value }),
	setIcon: (value) => set({ icon: value }),
	setIconColor: (value) => set({ iconColor: value }),
}));

export { useCardStore };
