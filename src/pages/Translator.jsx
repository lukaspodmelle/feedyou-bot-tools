import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import XLSX from 'xlsx';

import {
	DownloadSimple,
	Trash,
	CaretLeft,
	CaretRight,
	ArrowCounterClockwise,
} from '@phosphor-icons/react';
import {
	LangDropdown,
	LoadingSpinner,
	ToolButton,
	Tooltip,
} from '../components';
import TranslatorUploader from '../ui/TranslatorUploader';
import TranslatorDebug from '../ui/TranslatorDebug';
import Modal from '../ui/Modal';
import { languages } from '../assets/deepl-languages';
import { siteConfig } from '../siteConfig';

import { useTranslatorStore } from '../context/translatorStore';
// import TranslatorToolBar from '../ui/TranslatorToolBar';

const linkClassName = `w-[40px] h-[40px] flex justify-center items-center rounded-sm focus:outline-accent-50`;
const parentLinkClassName = `hidden md:block w-[40px] h-[40px] bg-slate-100 rounded-sm text-sm select-none`;
const arrowsClassName = `w-[40px] h-[40px] bg-slate-100 rounded-sm text-sm select-none`;

const Translator = () => {
	// Global states
	const {
		jsonData,
		setJsonData,
		sheetNames,
		setSheetNames,
		workbook,
		setWorkbook,
		fileName,
		setFileName,
		targetLanguage,
		setTargetLanguage,
		translatedLanguages,
		setTranslatedLanguages,
		fixed,
		setFixed,
		isModalOpen,
		setModalOpen,
		modal,
		setModal,
	} = useTranslatorStore();

	// Local states
	const [loadingTranslation, setLoadingTranslation] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);

	// Tool bar scrolling
	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;

			const threshold = 93; // height of navbar in px
			setFixed(scrollY >= threshold);
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// Handle translation
	const handleTranslation = async () => {
		const isAnyStringTranslated = jsonData.some((obj) =>
			obj.hasOwnProperty(targetLanguage.language.toLowerCase())
		);
		if (isAnyStringTranslated) {
			await new Promise((resolve) =>
				openModal({
					title: 'Some texts are already translated',
					text: `You can click Overwrite to replace all translations with new texts from DeepL.`,
					confirm: 'Overwrite',
					cancel: 'Cancel',
					onConfirm: resolve,
				})
			);
		}

		setLoadingTranslation(true);
		try {
			const url = 'https://feedyou-bot-tools-api.vercel.app/api/v1/deepl';
			const textToTranslate = jsonData.map((obj) => obj.value);

			// API accepts: [["texts array"], "targetLanguage"]
			const dataToSend = [textToTranslate, targetLanguage.language];
			const returnedData = await postData(url, dataToSend);

			processReturnedData(returnedData);
		} catch (error) {
			console.log(error);
		} finally {
			setLoadingTranslation(false);
		}
	};
	// Fetch DeepL translation
	const postData = async (url, data) => {
		try {
			const options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			};
			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error('HTTP error! Status: ' + response.status);
			}

			const responseData = await response.json();
			return responseData;
		} catch (error) {
			console.log('Error:', error);
			throw error;
		}
	};
	// Process fetched translation
	const processReturnedData = (data) => {
		const translatedTexts = data.translations.map(
			(translation) => translation.text
		);

		const newJsonData = [...jsonData];
		translatedTexts.forEach((text, index) => {
			if (index < newJsonData.length) {
				newJsonData[index][targetLanguage.language.toLowerCase()] =
					text;
			}
		});
		setJsonData(newJsonData);
		handleSetTranslatedLanguages();
	};

	// Keeping track of translated languages
	const handleSetTranslatedLanguages = (isEmpty) => {
		if (
			!translatedLanguages.includes(targetLanguage.language) &&
			!isEmpty
		) {
			const newTranslatedLanguages = [
				...translatedLanguages,
				targetLanguage.language,
			];
			setTranslatedLanguages(newTranslatedLanguages);
		} else if (isEmpty) {
			const newTranslatedLanguages = translatedLanguages.filter(
				(language) => language !== targetLanguage.language
			);
			setTranslatedLanguages(newTranslatedLanguages);
		}
	};
	// File uploading
	const sheetName = 'Chatbot texts';
	const handleFileUpload = (e, isDragAndDrop) => {
		e.preventDefault();
		const file = isDragAndDrop
			? e.dataTransfer.files[0]
			: e.target.files[0];
		if (file) {
			const fileName = file.name.split('.')[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = e.target.result;
				const workbook = XLSX.read(data);
				const sheetNames = workbook.SheetNames;
				if (!sheetNames.includes(sheetName)) {
					openModal({
						title: 'Cannot read uploaded file',
						text: `Please check whether you're uploading a correct file previously exported from Feedyou Platform.`,
						confirm: 'Try again',
					});
				}
				const worksheet = workbook.Sheets[sheetName];
				const json = XLSX.utils.sheet_to_json(worksheet);

				setWorkbook(workbook);
				setSheetNames(sheetNames);
				setJsonData(json);
			};
			reader.readAsArrayBuffer(file);
			setFileName(fileName);
		}
	};

	// File exporting
	const handleFileExport = () => {
		if (workbook) {
			workbook.Sheets[sheetName] = XLSX.utils.json_to_sheet(jsonData);
			XLSX.writeFile(workbook, `${fileName}-translated.xlsx`);
		}
	};

	// Adding or removing translated texts
	const handleInputChange = (text, index) => {
		const newJsonData = [...jsonData];
		if (text === '') {
			delete newJsonData[index][targetLanguage.language.toLowerCase()];
			handleSetTranslatedLanguages(true);
		} else {
			newJsonData[index][targetLanguage.language.toLowerCase()] = text;
			handleSetTranslatedLanguages();
		}

		setJsonData(newJsonData);
	};

	// Handle trash
	const handleTrash = () => {
		setJsonData([]);
		setTranslatedLanguages([]);
	};

	// Handle reset translations
	const handleReset = () => {
		const newJsonData = [...jsonData];
		for (let obj of newJsonData) {
			delete obj[targetLanguage.language.toLowerCase()];
		}
		handleSetTranslatedLanguages(true);
		setJsonData(newJsonData);
	};

	// Handle modals
	const openModal = (content) => {
		setModal(content);
		setModalOpen(true);
	};
	const closeModal = () => {
		setModal({});
		setModalOpen(false);
	};

	// Display data & pagination
	const itemsPerPage = 10;
	const pageCount = Math.ceil(jsonData.length / itemsPerPage);
	const offset = currentPage * itemsPerPage;
	const currentItems = jsonData.slice(offset, offset + itemsPerPage);
	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};
	const renderItems = currentItems.map((item, index) => (
		<div
			key={index}
			className='TranslationCard bg-white text-slate-700 border border-slate-200 rounded-md mb-4 shadow-sm'
		>
			<div className='flex justify-between py-4 px-6 border-b border-slate-200'>
				<div className='flex gap-8'>
					<div className='flex flex-col'>
						<h6 className='m-0'>Step ID</h6>
						<span className='font-bold'>{item.stepId}</span>
					</div>
					<div className='flex flex-col'>
						<h6 className='m-0'>Type</h6>
						<span className='font-bold capitalize'>
							{item.stepType}
						</span>
					</div>
				</div>
			</div>

			<div className='md:flex'>
				<div className='Original p-6 md:border-r border-slate-200 bg-slate-50 text-slate-400 flex-1 rounded-bl-md'>
					{item.value}
				</div>
				<div className='Translation p-6 flex-1'>
					<textarea
						id={index}
						rows={1}
						className='w-full h-full min-h-full focus:outline-none'
						type='text'
						placeholder='Type here or click Translate ...'
						value={
							item[targetLanguage.language.toLowerCase()] || ''
						}
						onChange={(e) =>
							handleInputChange(e.target.value, index)
						}
					/>
				</div>
			</div>
		</div>
	));

	return (
		<>
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				title={modal.title || 'Title'}
				text={modal.text || 'Content'}
				confirm={modal.confirm || 'Confirm'}
				cancel={modal.cancel || null}
				onConfirm={modal.onConfirm || (() => {})}
			/>

			{jsonData.length !== 0 ? (
				<div
					className={`${
						fixed ? 'fixed top-0 z-50' : ''
					} bg-white border-b border-slate-200 w-full px-8 flex justify-center`}
					style={{ height: siteConfig.navigation.toolsHeight }}
				>
					<div className='w-full flex justify-between items-center'>
						<div className='hidden lg:flex gap-2'>
							<Tooltip text='Remove file'>
								<ToolButton
									onButtonClick={handleTrash}
									icon={<Trash size={20} />}
								/>
							</Tooltip>
							<Tooltip text='Reset translations'>
								<ToolButton
									onButtonClick={handleReset}
									icon={<ArrowCounterClockwise size={20} />}
								/>
							</Tooltip>
						</div>
						<div className='flex gap-8'>
							{pageCount < 2 ? null : (
								<ReactPaginate
									previousLabel={<CaretLeft />}
									nextLabel={<CaretRight />}
									breakLabel={'...'}
									pageCount={pageCount}
									marginPagesDisplayed={1}
									pageRangeDisplayed={3}
									onPageChange={handlePageChange}
									containerClassName={
										'flex justify-center items-center gap-2'
									}
									pageClassName={parentLinkClassName}
									pageLinkClassName={linkClassName}
									previousClassName={arrowsClassName}
									previousLinkClassName={linkClassName}
									nextClassName={arrowsClassName}
									nextLinkClassName={linkClassName}
									activeClassName={
										'!bg-accent text-white rounded-sm'
									}
									breakClassName={
										'hidden md:block select-none focus:outline-none'
									}
									renderOnZeroPageCount={null}
								/>
							)}
							<div className='flex gap-2'>
								<LangDropdown
									data={languages}
									reference={translatedLanguages}
									selected={targetLanguage}
									onDropdownChange={(value) =>
										setTargetLanguage(value)
									}
								/>
								<button
									className='bg-accent-50 text-accent border-none py-2 px-5 rounded-md font-bold cursor-pointer flex flex-row items-center gap-4 focus:outline-accent'
									onClick={handleTranslation}
								>
									{loadingTranslation && (
										<LoadingSpinner
											ringColor='fill-accent'
											spinnerColor='stroke-white'
											size={15}
										/>
									)}
									{loadingTranslation
										? 'Translating...'
										: 'Translate'}
								</button>
							</div>

							<button
								className='hidden bg-accent text-white border-none py-2 px-5 rounded-md font-bold cursor-pointer lg:flex flex-row items-center gap-2 focus:outline-accent-50'
								onClick={handleFileExport}
							>
								Export file
								<DownloadSimple />
							</button>
						</div>
					</div>
				</div>
			) : null}
			<div
				className='TranslationScreen [min-height:calc(100vh-95px)] bg-slate-50 flex justify-center'
				style={
					jsonData.length !== 0 && fixed
						? { marginTop: siteConfig.navigation.toolsHeight }
						: {}
				}
			>
				<div className='max-w-[900px] w-full px-8 py-8 lg:px-0 lg:py-8'>
					{jsonData.length == 0 ? (
						<TranslatorUploader
							onDrop={(e) => {
								handleFileUpload(e, true);
								setIsDragging(false);
							}}
							onDragOver={(e) => {
								e.preventDefault();
								setIsDragging(true);
							}}
							onDragLeave={() => setIsDragging(false)}
							inputOnChange={(e) => handleFileUpload(e, false)}
							isDragging={isDragging}
						/>
					) : null}

					{jsonData.length !== 0 ? (
						<div className='fixed right-6 bottom-6 flex flex-col items-center gap-3 lg:hidden'>
							<div className='flex flex-col gap-2'>
								<ToolButton
									onButtonClick={handleTrash}
									icon={<Trash size={20} />}
								/>
								<ToolButton
									onButtonClick={handleReset}
									icon={<ArrowCounterClockwise size={20} />}
								/>
							</div>
							<div
								onClick={handleFileExport}
								className='w-[52px] h-[52px] bg-accent rounded-full flex justify-center items-center cursor-pointer'
							>
								<DownloadSimple size={26} color='white' />
							</div>
						</div>
					) : null}

					{renderItems}

					{window.location.href.includes('#debug') && (
						<TranslatorDebug />
					)}
				</div>
			</div>
		</>
	);
};

export default Translator;
