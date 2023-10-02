import React from 'react';
import * as Icon from '@phosphor-icons/react';

const IconSelector = ({ icon }) => {
	return (
		<button className='border border-slate-200 p-3 rounded-md'>
			<Icon.Cake size={30} weight='duotone' color={'#2B2944'} />
		</button>
	);
};

export default IconSelector;
