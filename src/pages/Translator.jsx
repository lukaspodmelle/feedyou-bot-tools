import React, { useState } from 'react';
import XLSX from 'xlsx';

import { Checkbox } from '../components';

const demoDeepl = {
	translations: [
		{
			detected_source_language: 'EN',
			text: 'Dobrý den, jsem Vinnie, váš virtuální asistent. Rád vám pomohu zjistit další informace o vaší zásilce nebo provést změny v doručení. Případně mohu zodpovědět další vaše dotazy.',
		},
		{
			detected_source_language: 'EN',
			text: 'Vyberte jednu z následujících kategorií:',
		},
		{
			detected_source_language: 'EN',
			text: 'Změna času doručení nebo adresy',
		},
	],
};

const Translator = () => {
	const [jsonData, setJsonData] = useState([]);
	const [sheetNames, setSheetNames] = useState();
	const [workbook, setWorkbook] = useState();
	const [fileName, setFileName] = useState();

	// Handle translation
	const handleTranslation = () => {
		const translatedTexts = demoDeepl.translations.map(
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

	// File exporting
	const handleFileExport = () => {
		if (workbook) {
			workbook.Sheets[sheetName] = XLSX.utils.json_to_sheet(jsonData);
			XLSX.writeFile(workbook, `${fileName}-translated.xlsx`);
		}
	};

	// DEBUG
	const prepareForTranslation = () => {
		console.log(jsonData.map((obj) => obj.value));
	};

	return (
		<div className='[min-height:calc(100vh-93px)] bg-slate-50 flex justify-center'>
			<div className='max-w-[900px] w-full px-8 lg:px-0'>
				<input type='file' accept='.xlsx' onChange={handleFileUpload} />
				Translated: / {jsonData.length}
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
								Mark complete
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
									readOnly
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
	);
};

export default Translator;
