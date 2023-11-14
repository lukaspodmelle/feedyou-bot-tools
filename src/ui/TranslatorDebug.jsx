import React from 'react';

import { useTranslatorStore } from '../context';

const TranslatorDebug = () => {
	const { sheetNames, workbook, jsonData, translatedLanguages } =
		useTranslatorStore();

	return (
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
				onClick={() => console.log(translatedLanguages)}
				className='bg-black text-white p-2 rounded-full'>
				Debug: Log translatedLanguages
			</button>
		</div>
	);
};

export default TranslatorDebug;
