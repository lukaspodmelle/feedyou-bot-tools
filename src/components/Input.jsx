import React from 'react';

const Input = () => {
	return (
		<div className='border border-slate-200 rounded-md p-3 w-full flex items-center'>
			<input
				type='text'
				placeholder='Your text...'
				className='w-full focus:outline-none'
			/>
		</div>
	);
};

export default Input;
