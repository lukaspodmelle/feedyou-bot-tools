import { create } from 'zustand';
import { languages } from '../assets/deeplLanguages';

const useTranslatorStore = create((set) => ({
	jsonData: [],
	sheetNames: null,
	workbook: null,
	fileName: null,
	targetLanguage: languages[1], // CS
	translatedLanguages: [],
	fixed: false,
	isModalOpen: false,
	modal: {},

	setJsonData: (value) => set({ jsonData: value }),
	setSheetNames: (value) => set({ sheetNames: value }),
	setWorkbook: (value) => set({ workbook: value }),
	setFileName: (value) => set({ fileName: value }),
	setTargetLanguage: (value) => set({ targetLanguage: value }),
	setTranslatedLanguages: (value) => set({ translatedLanguages: value }),
	setFixed: (value) => set({ fixed: value }),
	setModalOpen: (value) => set({ isModalOpen: value }),
	setModal: (value) => set({ modal: value }),
}));

export { useTranslatorStore };
