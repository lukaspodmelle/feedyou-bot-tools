import React from 'react';
import { Info } from '@phosphor-icons/react';

const Nav = () => {
	return (
		<div className='flex justify-between p-8 border-b border-slate-200'>
			<h1 className='text-slate-700'>Feedyou Bot Tools</h1>

			<div className='flex items-center gap-3'>
				<span className='hidden sm:block text-xs text-slate-500 bg-slate-100 py-1 px-3 rounded-full'>
					v1.0.0
				</span>
				<Info size={22} weight='bold' className='text-slate-700' />
			</div>
		</div>
	);
};

export default Nav;
