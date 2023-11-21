import { useModalStore } from '../context';

export const ModalHandler = () => {
	const { setModalOpen, setModal } = useModalStore();

	// Handle modals
	const openModal = (content) => {
		setModal(content);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModal({});
		setModalOpen(false);
	};

	return { openModal, closeModal };
};
