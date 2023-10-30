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
		<div>
			<input type='file' accept='.xlsx' onChange={handleFileUpload} />

			<h2>Výsledek:</h2>

			{jsonData.map((item, index) => (
				<input
					key={index}
					type='text'
					value={item.value}
					readOnly
					className='w-full focus:outline-none disabled:text-slate-300 disabled:bg-transparent border border-slate-300 p-4 m-3'
				/>
			))}
		</div>
	);
}

export default Translator;
