import React from 'react';

import { useTranslatorStore } from '../context';

const buttonClass = 'bg-black text-white py-1 px-4 rounded-full';

const TranslatorDebug = () => {
	const {
		sheetNames,
		workbook,
		jsonData,
		translatedLanguages,
		targetLanguage,
	} = useTranslatorStore();

	return (
		<div className='absolute bottom-4 right-4 gap-2 inline-flex flex-col'>
			<button
				onClick={() => console.log(sheetNames)}
				className={buttonClass}
			>
				Log sheet names
			</button>
			<button
				onClick={() => console.log(workbook)}
				className={buttonClass}
			>
				Log workbook
			</button>
			<button
				onClick={() => console.log(jsonData)}
				className={buttonClass}
			>
				Log jsonData
			</button>
			<button
				onClick={() => console.log(translatedLanguages)}
				className={buttonClass}
			>
				Log translatedLanguages
			</button>
			<button
				onClick={() =>
					console.log(targetLanguage.language.toLowerCase())
				}
				className={buttonClass}
			>
				Log targetLanguage
			</button>
		</div>
	);
};

export default TranslatorDebug;
