import { create } from 'zustand';
import fonts from '../assets/fonts';
import phosphorIcons from '../assets/phosphorIcons';

const randomIndex = Math.floor(Math.random() * phosphorIcons.length);
const nineToFive = 'w-[450px] h-[250px]';

const cardDefaults = {
	backgroundColor: '#006cf8',
	text: '',
	textColor: '#FFFFFF',
	textFont: fonts[0],
	Icon: phosphorIcons[randomIndex].icon,
	iconColor: '#FFFFFF',
	cardSize: nineToFive,
};

const useCardStore = create((set) => ({
	backgroundColor: cardDefaults.backgroundColor,
	text: cardDefaults.text,
	textColor: cardDefaults.textColor,
	textFont: cardDefaults.textFont,
	Icon: cardDefaults.Icon,
	iconColor: cardDefaults.iconColor,
	iconsEnabled: true,
	cardSize: cardDefaults.cardSize,

	setBackgroundColor: (value) => set({ backgroundColor: value }),
	setText: (value) => set({ text: value }),
	setTextColor: (value) => set({ textColor: value }),
	setTextFont: (value) => set({ textFont: value }),
	setIcon: (value) => set({ Icon: value }),
	setIconColor: (value) => set({ iconColor: value }),
	setIconsEnabled: (value) => set({ iconsEnabled: value }),
	setCardSize: (value) => set({ cardSize: value }),
}));

export { useCardStore };
