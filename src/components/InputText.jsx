import React from 'react';
import { X } from '@phosphor-icons/react';

const InputText = ({
	placeholder,
	value,
	isDisabled = false,
	maxLength = null,
	onInputChange,
}) => {
	return (
		<div className='border border-slate-200 rounded-md p-3 w-full flex gap-2 items-center justify-between'>
			<input
				type='text'
				value={value}
				maxLength={maxLength}
				placeholder={placeholder}
				disabled={isDisabled}
				className='w-full focus:outline-none disabled:text-slate-300 disabled:bg-transparent'
				onChange={(e) => onInputChange(e.target.value)}
			/>
			{value != '' ? (
				<div className='flex gap-2 items-center'>
					{maxLength !== null ? (
						<span
							className={`${
								value.length === maxLength
									? 'text-red-500'
									: null
							} text-[10px]`}>
							{value.length}/{maxLength}
						</span>
					) : null}
					<span
						className='bg-slate-100 p-1 rounded-full hover:bg-red-50 text-slate-500 hover:text-red-500 hover:cursor-pointer'
						onClick={() => onInputChange('')}>
						<X size={12} />
					</span>
				</div>
			) : null}
		</div>
	);
};

export default InputText;
