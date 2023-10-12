import React, { useState, useRef, useEffect } from 'react';
import { X } from '@phosphor-icons/react';
import { HexColorPicker } from 'react-colorful';

import { useCardStore } from '../context';

const InputColor = ({ placeholder }) => {
	// Color store
	const { backgroundColor, setBackgroundColor } = useCardStore();

	// Color picker
	const [openColorPicker, setOpenColorPicker] = useState(false);
	const colorPickerRef = useRef(null);
	const colorPickerSwatchRef = useRef(null);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleClickOutside = (e) => {
		if (
			colorPickerRef.current &&
			!colorPickerRef.current.contains(e.target) &&
			colorPickerSwatchRef.current &&
			!colorPickerSwatchRef.current.contains(e.target)
		) {
			setOpenColorPicker(false);
		}
	};

	// Handler function for color change
	const handleBackgroundChange = (color) => {
		setBackgroundColor(color);
	};

	return (
		<div className='border border-slate-200 rounded-md p-3 w-full flex items-center'>
			<div className='border border-slate-200 rounded-full p-1 relative'>
				<span
					ref={colorPickerSwatchRef}
					className='w-4 h-4 block rounded-full hover:cursor-pointer'
					style={
						backgroundColor !== ''
							? { background: backgroundColor }
							: { background: '#FFFFFF' }
					}
					onClick={() =>
						setOpenColorPicker((prevState) => !prevState)
					}>
					{backgroundColor === '' ? <X color='#d1d9e3' /> : ''}
				</span>
				<div
					ref={colorPickerRef}
					className={`${
						openColorPicker
							? 'block opacity-100'
							: 'hidden opacity-0'
					} absolute top-8 left-0 z-40`}>
					<HexColorPicker
						color={backgroundColor}
						onChange={handleBackgroundChange}
					/>
				</div>
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
