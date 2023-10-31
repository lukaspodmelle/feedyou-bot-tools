import React from 'react'

const Checkbox = ({onCheckboxChange}) => {
    return (
		<div className='flex gap-2 justify-center items-center'>
			<input
				className='peer relative appearance-none shrink-0 w-6 h-6 border-2 border-accent-50 bg-white focus:outline-none focus:ring-offset-0 focus:ring-0 checked:bg-accent checked:border-0 disabled:border-steel-400 disabled:bg-steel-400 rounded-full cursor-pointer'
				type='checkbox'
				onChange={onCheckboxChange}
			/>
			<svg
				className='absolute w-3 h-3 pointer-events-none hidden peer-checked:block stroke-white outline-none'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='4'
				strokeLinecap='round'
				strokeLinejoin='round'>
				<polyline points='20 6 9 17 4 12'></polyline>
			</svg>
		</div>
	);
}

export default Checkbox
