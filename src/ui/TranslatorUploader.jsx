import React from 'react';
import { FileArrowUp } from '@phosphor-icons/react';

const TranslatorUploader = ({
	onDrop,
	onDragOver,
	onDragLeave,
	isDragging,
	inputOnChange,
}) => {
	return (
		<div className='bg-white border border-slate-200 rounded-md p-8 shadow-sm'>
			<div className='flex flex-col lg:flex-row gap-4 lg:justify-between pb-8'>
				<h2>Upload bot file for translation</h2>
			</div>
			<div
				onDrop={onDrop}
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				className={`${
					isDragging
						? 'border-accent transition-all'
						: 'border-slate-200 transition-all'
				} border-2 border-dashed rounded-md flex justify-center items-center text-center flex-col px-12 py-24`}>
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
					onChange={inputOnChange}
				/>
				<label
					htmlFor='file'
					className='bg-accent-50 text-accent border-none py-2 px-5 rounded-md font-bold cursor-pointer mt-4'>
					Browse files
				</label>
			</div>
		</div>
	);
};

export default TranslatorUploader;
