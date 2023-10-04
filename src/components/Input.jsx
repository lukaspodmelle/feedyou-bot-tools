import React from 'react';

const Input = ({ placeholder, value, onInputChange }) => {
	return (
		<div className='border border-slate-200 rounded-md p-3 w-full flex items-center'>
			<input
				type='text'
				value={value}
				placeholder={placeholder}
				className='w-full focus:outline-none'
				onChange={(e) => onInputChange(e.target.value)}
			/>
		</div>
	);
};

export default Input;
