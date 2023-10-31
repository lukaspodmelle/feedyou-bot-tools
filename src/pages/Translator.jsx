import React, { useState } from 'react';
import XLSX from 'xlsx';

import { FileArrowUp, DownloadSimple } from '@phosphor-icons/react';

import { Checkbox, Dropdown } from '../components';

const Translator = () => {
	const [jsonData, setJsonData] = useState([]);
	const [sheetNames, setSheetNames] = useState();
	const [workbook, setWorkbook] = useState();
	const [fileName, setFileName] = useState();
	const [loadingTranslation, setLoadingTranslation] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [targetLanguage, setTargetLanguage] = useState('PL');

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

	return (
		<>
			{jsonData == '' ? null : (
				<div className='bg-white border-b border-slate-200 w-full p-4 flex justify-center'>
					<div className='max-w-[900px] w-full flex justify-between items-center'>
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
							className='bg-accent-50 text-accent border-none py-2 px-5 rounded-md font-bold cursor-pointer flex flex-row items-center gap-2'
							onClick={handleTranslation}>
							Translate
						</button>
						{/* <Dropdown
							items={[{ name: 'Czech' }]}
							selected={[{ name: 'Czech' }]}
							onDropdownChange={(value) =>
								setTargetLanguage(value)
							}
						/> */}
						<button
							className='bg-accent-50 text-accent border-none py-2 px-5 rounded-md font-bold cursor-pointer flex flex-row items-center gap-2'
							onClick={handleFileExport}>
							Export file
							<DownloadSimple />
						</button>
					</div>
				</div>
			)}
			<div className='TranslationScreen [min-height:calc(100vh-93px)] bg-slate-50 flex justify-center'>
				<div className='max-w-[900px] w-full px-8 lg:px-0 lg:p-20'>
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
								<h6>
									Supported files: XLSX from Feedyou Platform
								</h6>
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

					{jsonData.map((item, index) => (
						<div
							key={index}
							className='TranslationCard bg-white text-slate-700 border border-slate-200 rounded-md mb-4 shadow-sm'>
							<div className='flex justify-between py-4 px-6 border-b border-slate-200'>
								<div className='flex gap-8'>
									<div className='flex flex-col'>
										<h6 className='m-0'>Step ID</h6>
										<span className='font-bold'>
											{item.stepId}
										</span>
									</div>
									<div className='flex flex-col'>
										<h6 className='m-0'>Step ID</h6>
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
											handleInputChange(
												e.target.value,
												index
											)
										}
									/>
								</div>
							</div>
						</div>
					))}
					{/* {jsonData.map((item) => {
					console.log(item.value);
				})}
				<pre>{JSON.stringify(jsonData, null, 2)}</pre> */}
				</div>
			</div>
		</>
	);
};

export default Translator;
