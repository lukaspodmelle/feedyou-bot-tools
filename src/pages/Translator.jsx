import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import XLSX from 'xlsx';

import {
	FileArrowUp,
	DownloadSimple,
	CaretLeft,
	CaretRight,
	CircleNotch,
} from '@phosphor-icons/react';

import { Checkbox, Dropdown, LoadingSpinner } from '../components';
import { languages } from '../assets/deepl-languages';

const Translator = () => {
	const [jsonData, setJsonData] = useState([]);
	const [sheetNames, setSheetNames] = useState();
	const [workbook, setWorkbook] = useState();
	const [fileName, setFileName] = useState();
	const [loadingTranslation, setLoadingTranslation] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [targetLanguage, setTargetLanguage] = useState('PL');
	const [currentPage, setCurrentPage] = useState(0);
	const [fixed, setFixed] = useState(false);

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
		setLoadingTranslation(true);
		try {
			const url = 'https://feedyou-bot-tools-api.vercel.app/api/v1/deepl';
			const textToTranslate = jsonData.map((obj) => obj.value);
			const dataToSend = [textToTranslate, targetLanguage];

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
		const translatedJsonData = [...jsonData];

		translatedTexts.forEach((text, index) => {
			if (index < translatedJsonData.length) {
				translatedJsonData[index]['translation'] = text;
			}
		});
		setJsonData(translatedJsonData);
	};

	// File uploading
	const sheetName = 'Chatbot texts';

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const fileName = file.name.split('.')[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = e.target.result;
				const workbook = XLSX.read(e.target.result);
				const sheetNames = workbook.SheetNames;
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

	// Drag and drop file uploading
	const handleFileDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];

		if (file) {
			const fileName = file.name.split('.')[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = e.target.result;
				const workbook = XLSX.read(e.target.result);
				const sheetNames = workbook.SheetNames;
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
	const handleInputChange = (text, index) => {};

	// DEBUG
	const prepareForTranslation = () => {
		console.log(jsonData.map((obj) => obj.value));
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
				<div className='flex items-center gap-4'>
					<Checkbox
						onCheckboxChange={(e) =>
							handleCheck(index, e.target.checked)
						}
					/>
					Translation complete
				</div>
			</div>

			<div className='md:flex'>
				<div className='Original p-6 md:border-r border-slate-200 bg-slate-50 text-slate-400 flex-1 rounded-bl-md'>
					{item.value}
				</div>
				<div className='Translation p-6 flex-1'>
					<textarea
						rows={1}
						className='w-full h-full min-h-full focus:outline-none'
						type='text'
						name='translation'
						placeholder='Start translating...'
						value={item.translation}
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
			{jsonData == '' ? null : (
				<div
					className={`${
						fixed ? 'fixed top-0 z-50' : ''
					} bg-white border-b border-slate-200 w-full py-4 px-8 flex justify-center`}>
					<div className=' w-full flex justify-between items-center'>
						<button onClick={() => setJsonData([])}>Trash</button>
						<span>
							Translated:{' '}
							<span className='font-bold'>
								{jsonData.length} / {jsonData.length} (
								{(jsonData.length / jsonData.length) * 100}%)
							</span>
						</span>
						<input
							type='text'
							value={targetLanguage}
							onChange={(e) => setTargetLanguage(e.target.value)}
						/>

						<button
							className='bg-accent-50 text-accent border-none py-2 px-5 rounded-md font-bold cursor-pointer flex flex-row items-center gap-4'
							onClick={handleTranslation}>
							{loadingTranslation && (
								<LoadingSpinner
									ringColor='accent'
									spinnerColor='white'
									size={15}
								/>
							)}
							{loadingTranslation
								? 'Translating...'
								: 'Translate'}
						</button>
						{/* <Dropdown
							items={[{ name: 'Czech' }]}
							selected={[{ name: 'Czech' }]}
							onDropdownChange={(value) =>
								setTargetLanguage(value)
							}
						/> */}
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
									'w-[40px] h-[40px] flex justify-center items-center rounded-sm'
								}
								previousClassName={
									'w-[40px] h-[40px] bg-slate-100 rounded-sm text-sm select-none'
								}
								previousLinkClassName={
									'w-[40px] h-[40px] flex justify-center items-center rounded-sm'
								}
								nextClassName={
									'w-[40px] h-[40px] bg-slate-100 rounded-sm text-sm select-none'
								}
								nextLinkClassName={
									'w-[40px] h-[40px] flex justify-center items-center rounded-sm'
								}
								activeClassName={
									'!bg-accent text-white rounded-sm'
								}
								breakClassName={'select-none'}
								renderOnZeroPageCount={null}
							/>
						)}
						<button
							className='bg-accent-50 text-accent border-none py-2 px-5 rounded-md font-bold cursor-pointer flex flex-row items-center gap-2'
							onClick={handleFileExport}>
							Export file
							<DownloadSimple />
						</button>
					</div>
				</div>
			)}
			<div
				className={`TranslationScreen [min-height:calc(100vh-93px)] bg-slate-50 flex justify-center ${
					fixed ? 'mt-[73px]' : ''
				}`}>
				<div className='max-w-[900px] w-full px-8 lg:px-0 lg:pb-20 lg:pt-10'>
					{jsonData == '' ? (
						<div className='bg-white border border-slate-200 rounded-md p-8 shadow-sm'>
							<h2 className='pb-8'>
								Upload bot file to be translated
							</h2>
							<div
								onDrop={handleFileDrop}
								onDragOver={(e) => {
									e.preventDefault();
									setIsDragging(true);
								}}
								onDragLeave={() => setIsDragging(false)}
								className={`${
									isDragging
										? 'border-accent transition-all'
										: 'border-slate-200 transition-all'
								} border-2 border-dashed rounded-md flex justify-center items-center flex-col p-8`}>
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
									onChange={handleFileUpload}
								/>
								<label
									htmlFor='file'
									className='bg-accent-50 text-accent border-none py-2 px-5 rounded-md font-bold cursor-pointer mt-4'>
									Upload file
								</label>
							</div>
						</div>
					) : null}

					{loadingTranslation && <div>Loading...</div>}

					{window.location.href.includes('#debug') && (
						<div className='absolute bottom-4 right-4 flex flex-col gap-2'>
							<button
								onClick={handleTranslation}
								className='bg-black text-white p-2 rounded-full'>
								Handle translation
							</button>
							<button
								onClick={prepareForTranslation}
								className='bg-black text-white p-2 rounded-full'>
								Debug: Show texts for translation
							</button>
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
								onClick={handleFileExport}
								className='bg-black text-white p-2 rounded-full'>
								Export
							</button>
						</div>
					)}

					{renderItems}

					{/* {jsonData == '' || pageCount < 2 ? null : (
						<div className='Pagination fixed bottom-0 left-0 w-full bg-white py-4 border-t border-slate-200'></div>
					)} */}
				</div>
			</div>
		</>
	);
};

export default Translator;
