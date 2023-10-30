import React, { useState } from 'react';
import XLSX from 'xlsx';

function Translator() {
	const [jsonData, setJsonData] = useState([]);

	function handleFileUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, { type: 'array' });
				const sheetName = workbook.SheetNames[0]; // Sheet index
				const worksheet = workbook.Sheets[sheetName];
				const resultJson = XLSX.utils.sheet_to_json(worksheet);
				setJsonData(resultJson);
			};
			reader.readAsArrayBuffer(file);
		}
	}

	return (
		<div className='Editor [min-height:calc(100vh-93px)] bg-slate-50 flex justify-center'>
			<div className='max-w-[900px] w-full'>
				<input type='file' accept='.xlsx' onChange={handleFileUpload} />

				{/* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */}

				{jsonData.map((item, index) => (
					<div
						key={index}
						className='TranslationCard bg-white text-slate-700 border border-slate-200 rounded-md mb-4'>
						<div className='flex justify-between p-6 border-b border-slate-200'>
							<div className='flex gap-6'>
								<div className='flex gap-2'>
									<span>Step ID:</span>
									<span className='font-bold'>
										{item.stepId}
									</span>
								</div>
								<div className='flex gap-2'>
									<span>Step type:</span>
									<span className='font-bold'>
										{item.stepType}
									</span>
								</div>
							</div>
							<div className='flex gap-4'>
								<span>Mark complete</span>
								<input
									type='checkbox'
									name='translationComplete'
								/>
							</div>
						</div>
						<div className='flex '>
							<div className='Original p-6 border-r border-slate-200'>
								{item.value}
							</div>
							<div className='Translation p-6'>{item.value}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Translator;
