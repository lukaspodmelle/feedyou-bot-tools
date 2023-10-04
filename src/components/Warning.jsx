import React from 'react';

const Warning = ({ message }) => {
	return (
		<div className='Warning absolute border border-slate-200 bg-white p-4 rounded-md shadow-lg z-[1000] top-[calc(100%+10px)]'>
			{message}
		</div>
	);
};

export default Warning;
