import React from 'react';
import { Info } from '@phosphor-icons/react';

import { Chip, MenuDropdown } from '../components';

const Nav = () => {
	return (
		<div className='flex justify-between p-8 border-b border-slate-200 relative'>
			<div className='flex items-center gap-4'>
				<h1 className='text-slate-700'>Feedyou Bot Tools</h1>
				<MenuDropdown />
			</div>

			<div className='flex items-center gap-3'>
				<Chip text='v1.0.0' />
				<Info size={22} weight='bold' className='text-slate-700' />
			</div>
		</div>
	);
};

export default Nav;
