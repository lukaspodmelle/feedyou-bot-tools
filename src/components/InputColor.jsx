import React, { useState, useRef, useEffect } from 'react';
import { X } from '@phosphor-icons/react';
import { HexColorPicker } from 'react-colorful';

const InputColor = ({
	placeholder,
	color,
	style,
	isDisabled = false,
	onInputChange,
}) => {
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

	const handleSetOpenColorPicker = () => {
		if (!isDisabled) {
			setOpenColorPicker(!openColorPicker);
		}
		return;
	};

	return (
		<div
			className={`${
				style == null ? 'border border-slate-200 rounded-md p-3' : ''
			}  flex items-center`}>
			<div className='border border-slate-200 rounded-full p-1 relative'>
				<span
					ref={colorPickerSwatchRef}
					className='w-4 h-4 block rounded-full hover:cursor-pointer'
					style={
						color !== ''
							? { background: color }
							: { background: '#FFFFFF' }
					}
					onClick={handleSetOpenColorPicker}>
					{color === '' ? <X color='#d1d9e3' /> : ''}
				</span>

				<div
					ref={colorPickerRef}
					className={`${
						openColorPicker ? 'block' : 'hidden'
					} absolute top-8 left-0 z-40`}>
					<HexColorPicker color={color} onChange={onInputChange} />
				</div>
			</div>

			<input
				type='text'
				disabled={isDisabled}
				placeholder={placeholder}
				className='w-full ml-4 focus:outline-none disabled:text-slate-300 disabled:bg-transparent border-none p-0 m-0'
				value={color}
				onChange={(e) => onInputChange(e.target.value)}
			/>
		</div>
	);
};

export default InputColor;
