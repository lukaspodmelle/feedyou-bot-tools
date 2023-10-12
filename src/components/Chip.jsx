import React from 'react';

const Chip = ({ text }) => {
	return (
		<span className='hidden sm:block text-xs text-slate-500 bg-slate-100 py-1 px-3 rounded-full'>
			{text}
		</span>
	);
};

export default Chip;
