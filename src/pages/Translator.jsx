import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import XLSX from 'xlsx';

import { FileArrowUp, DownloadSimple, Trash } from '@phosphor-icons/react';
import { LangDropdown, LoadingSpinner, Modal } from '../components';
import { languages } from '../assets/deepl-languages';
import { siteConfig } from '../siteConfig';

const Translator = () => {
	const [jsonData, setJsonData] = useState([]);
	const [sheetNames, setSheetNames] = useState();
	const [workbook, setWorkbook] = useState();
	const [fileName, setFileName] = useState();
	const [loadingTranslation, setLoadingTranslation] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [targetLanguage, setTargetLanguage] = useState(languages[1]);
	const [translatedLanguages, setTranslatedLanguages] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [fixed, setFixed] = useState(false);
	const [isModalOpen, setModalOpen] = useState(false);
	const [modal, setModal] = useState({});

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

		const newTranslatedLanguages = [
			...translatedLanguages,
			targetLanguage.language,
		];
		setTranslatedLanguages(newTranslatedLanguages);
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

	// Editing of translated texts
	const handleInputChange = (text, index) => {
		const newJsonData = [...jsonData];
		newJsonData[index][targetLanguage.language.toLowerCase()] = text;
		setJsonData(newJsonData);
	};

	// Trash
	const handleTrash = () => {
		setJsonData([]);
		setTranslatedLanguages([]);
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
			className='TranslationCard bg-white text-slate-700 border border-slate-200 rounded-md mb-4 shadow-sm'>
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
				onConfirm={modal.onConfirm || null}
			/>

			{jsonData == '' ? null : (
				<div
					className={`${
						fixed ? 'fixed top-0 z-50' : ''
					} bg-white border-b border-slate-200 w-full px-8 flex justify-center`}
					style={{ height: siteConfig.navigation.toolsHeight }}>
					<div className=' w-full flex justify-between items-center'>
						<button
							className='w-[42px] h-[42px] flex justify-center items-center border border-slate-200 hover:bg-slate-50 rounded-md text-slate-700 focus:outline-accent-50'
							onClick={handleTrash}>
							<Trash size={20} />
						</button>
						<div className='flex gap-8'>
							{pageCount < 2 ? null : (
								<ReactPaginate
									previousLabel={
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='24'
											height='24'
											fill='#334155'
											viewBox='0 0 256 256'>
											<path d='M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z'></path>
										</svg>
									}
									nextLabel={
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='24'
											height='24'
											fill='#334155'
											viewBox='0 0 256 256'>
											<path d='M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z'></path>
										</svg>
									}
									breakLabel={'...'}
									pageCount={pageCount}
									marginPagesDisplayed={1}
									pageRangeDisplayed={3}
									onPageChange={handlePageChange}
									containerClassName={
										'flex justify-center items-center gap-2'
									}
									pageClassName={
										'w-[40px] h-[40px] bg-slate-100 rounded-sm text-sm select-none'
									}
									pageLinkClassName={
										'w-[40px] h-[40px] flex justify-center items-center rounded-sm focus:outline-accent-50'
									}
									previousClassName={
										'w-[40px] h-[40px] bg-slate-100 rounded-sm text-sm select-none'
									}
									previousLinkClassName={
										'w-[40px] h-[40px] flex justify-center items-center rounded-sm focus:outline-accent-50'
									}
									nextClassName={
										'w-[40px] h-[40px] bg-slate-100 rounded-sm text-sm select-none'
									}
									nextLinkClassName={
										'w-[40px] h-[40px] flex justify-center items-center rounded-sm focus:outline-accent-50'
									}
									activeClassName={
										'!bg-accent text-white rounded-sm'
									}
									breakClassName={
										'select-none focus:outline-none'
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
									onClick={handleTranslation}>
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
								className='bg-accent text-white border-none py-2 px-5 rounded-md font-bold cursor-pointer flex flex-row items-center gap-2 focus:outline-accent-50'
								onClick={handleFileExport}>
								Export file
								<DownloadSimple />
							</button>
						</div>
					</div>
				</div>
			)}
			<div
				className='TranslationScreen [min-height:calc(100vh-95px)] bg-slate-50 flex justify-center'
				style={
					jsonData.length !== 0 && fixed
						? { marginTop: siteConfig.navigation.toolsHeight }
						: {}
				}>
				<div className='max-w-[900px] w-full px-8 py-8 lg:px-0 lg:py-8'>
					{jsonData == '' ? (
						<div className='bg-white border border-slate-200 rounded-md p-8 shadow-sm'>
							<div className='flex flex-col lg:flex-row gap-4 lg:justify-between pb-8'>
								<h2>Upload bot file for translation</h2>
								{/* <span className='text-sm flex items-center gap-2 select-none cursor-pointer'>
									How does it work
									<span className='bg-slate-200 rounded-full w-[20px] h-[20px] flex items-center justify-center text-slate-700 font-bold text-xs'>
										?
									</span>
								</span> */}
							</div>
							<div
								onDrop={(e) => {
									handleFileUpload(e, true);
									setIsDragging(false);
								}}
								onDragOver={(e) => {
									e.preventDefault();
									setIsDragging(true);
								}}
								onDragLeave={() => setIsDragging(false)}
								className={`${
									isDragging
										? 'border-accent transition-all'
										: 'border-slate-200 transition-all'
								} border-2 border-dashed rounded-md flex justify-center items-center text-center flex-col p-8`}>
								<FileArrowUp
									size={60}
									weight='duotone'
									className='text-accent mb-4'
								/>
								<h2>Drag and drop file here</h2>
								<h6>Supported files: XLSX</h6>
								<input
									id='file'
									className='hidden'
									type='file'
									accept='.xlsx'
									onChange={(e) => handleFileUpload(e, false)}
								/>
								<label
									htmlFor='file'
									className='bg-accent-50 text-accent border-none py-2 px-5 rounded-md font-bold cursor-pointer mt-4'>
									Browse files
								</label>
							</div>
						</div>
					) : null}

					{window.location.href.includes('#debug') && (
						<div className='absolute bottom-4 right-4 flex flex-col gap-2'>
							<button
								onClick={() => console.log(sheetNames)}
								className='bg-black text-white p-2 rounded-full'>
								Debug: Log sheet names
							</button>
							<button
								onClick={() => console.log(workbook)}
								className='bg-black text-white p-2 rounded-full'>
								Debug: Log workbook
							</button>
							<button
								onClick={() => console.log(jsonData)}
								className='bg-black text-white p-2 rounded-full'>
								Debug: Log jsonData
							</button>
							<button
								onClick={() =>
									openModal({
										title: 'Pozor zmrde',
										content:
											'Něco ti tady musím povědět...',
										confirm: 'Ok bráško',
									})
								}
								className='bg-black text-white p-2 rounded-full'>
								Open modal
							</button>
						</div>
					)}

					{renderItems}
				</div>
			</div>
		</>
	);
};

export default Translator;
