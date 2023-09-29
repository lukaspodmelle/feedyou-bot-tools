import React from 'react';
import InfoIcon from './InfoIcon';

const Nav = () => {
	return (
		<div className='flex justify-between p-8 border-b border-slate-200'>
			<h1>Bot Tools</h1>
			<InfoIcon />
		</div>
	);
};

export default Nav;
