import React from 'react';

const ToolButton = ({ onButtonClick, icon }) => {
	return (
		<button
			className='w-[42px] h-[42px] flex justify-center items-center bg-white border border-slate-200 hover:bg-slate-50 rounded-md text-slate-700 focus:outline-accent-50'
			onClick={onButtonClick}
		>
			{icon}
		</button>
	);
};

export default ToolButton;
