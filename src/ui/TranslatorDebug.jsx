import React from 'react';

import { useTranslatorStore } from '../context';

const TranslatorDebug = () => {
	const {
		sheetNames,
		workbook,
		jsonData,
		translatedLanguages,
		targetLanguage,
	} = useTranslatorStore();

	return (
		<div className='absolute bottom-4 right-4 flex flex-col gap-2'>
			<button
				onClick={() => console.log(sheetNames)}
				className='bg-black text-white p-2 rounded-full'
			>
				Debug: Log sheet names
			</button>
			<button
				onClick={() => console.log(workbook)}
				className='bg-black text-white p-2 rounded-full'
			>
				Debug: Log workbook
			</button>
			<button
				onClick={() => console.log(jsonData)}
				className='bg-black text-white p-2 rounded-full'
			>
				Debug: Log jsonData
			</button>
			<button
				onClick={() => console.log(translatedLanguages)}
				className='bg-black text-white p-2 rounded-full'
			>
				Debug: Log translatedLanguages
			</button>
			<button
				onClick={() =>
					console.log(targetLanguage.language.toLowerCase())
				}
				className='bg-black text-white p-2 rounded-full'
			>
				Debug: Log targetLanguage
			</button>
		</div>
	);
};

export default TranslatorDebug;
