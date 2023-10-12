import React from 'react';
import { X } from '@phosphor-icons/react';

const InputText = ({ placeholder, value, onInputChange }) => {
	return (
		<div className='border border-slate-200 rounded-md p-3 w-full flex gap-2 items-center justify-between'>
			<input
				type='text'
				value={value}
				placeholder={placeholder}
				className='w-full focus:outline-none'
				onChange={(e) => onInputChange(e.target.value)}
			/>
			{value != '' ? (
				<span
					className='bg-slate-100 p-1 rounded-full hover:bg-red-50 text-slate-500 hover:text-red-500 hover:cursor-pointer'
					onClick={() => onInputChange('')}>
					<X size={12} />
				</span>
			) : null}
		</div>
	);
};

export default InputText;
