import React from 'react';
import { X } from '@phosphor-icons/react';

import { useBackgroundColorStore } from '../context';

const InputColor = ({ placeholder }) => {
	const { backgroundColor, setBackgroundColor } = useBackgroundColorStore();

	const handleBackgroundChange = (color) => {
		setBackgroundColor(color);
	};

	return (
		<div className='border border-slate-200 rounded-md p-3 w-full flex items-center'>
			<div className='border border-slate-200 rounded-full p-1'>
				<span
					className='w-4 h-4 block rounded-full'
					style={
						backgroundColor !== ''
							? { background: backgroundColor }
							: { background: '#FFFFFF' }
					}>
					{backgroundColor === '' ? <X color='#d1d9e3' /> : ''}
				</span>
			</div>
			<input
				type='text'
				placeholder={placeholder}
				className='w-full ml-4 focus:outline-none'
				value={backgroundColor}
				onChange={(e) => handleBackgroundChange(e.target.value)}
			/>
		</div>
	);
};

export default InputColor;
