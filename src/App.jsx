import React from 'react';

import { Nav } from './components';

const App = () => {
	return (
		<>
			<Nav />
			<div className='flex [height:calc(100vh-93px)]'>
				<div className='p-8 w-[24rem] border-r border-slate-200'>
					<p className='text-sm text-slate-500 mb-2'>
						Background Color
					</p>
					<input
						type='text'
						placeholder='#FFFFFF'
						className='border border-slate-200 rounded-md p-3 w-full'
					/>
				</div>
			</div>
		</>
	);
};

export default App;
