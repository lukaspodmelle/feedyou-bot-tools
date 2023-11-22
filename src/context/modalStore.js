import { create } from 'zustand';

const useModalStore = create((set) => ({
	isModalOpen: false,
	modal: {},

	setModalOpen: (value) => set({ isModalOpen: value }),
	setModal: (value) => set({ modal: value }),
}));

export { useModalStore };
