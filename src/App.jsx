import React from 'react';
import { Cake } from '@phosphor-icons/react';
import { Nav, Input, Dropdown, IconSelector } from './components';
import phosphorIcons from './assets/phosphor-icons';

const App = () => {
	return (
		<>
			<Nav />
			<div className='flex [height:calc(100vh-93px)] flex-col-reverse md:flex-row'>
				<div className='p-8 md:w-[26rem] border-r border-slate-200'>
					<div className='mb-6'>
						<p className='text-sm text-slate-500 mb-2'>
							Background Color
						</p>
						<div className='border border-slate-200 rounded-md p-3 w-full flex items-center'>
							<div className='border border-slate-200 rounded-full p-1'>
								<span className='w-4 h-4 bg-black block rounded-full'></span>
							</div>
							<input
								type='text'
								placeholder='#FFFFFF'
								className='w-full ml-4 focus:outline-none'
							/>
						</div>
					</div>

					<div className='mb-6'>
						<p className='text-sm text-slate-500 mb-2'>Text</p>
						<div className='flex gap-4'>
							<Input placeholder='Your text' />
							<div className='border border-slate-200 rounded-md p-3 w-full flex items-center'>
								<div className='border border-slate-200 rounded-full p-1'>
									<span className='w-4 h-4 bg-black block rounded-full'></span>
								</div>
								<input
									type='text'
									placeholder='#FFFFFF'
									className='w-full ml-4 focus:outline-none'
								/>
							</div>
						</div>
					</div>
					<div className='mb-6'>
						<p className='text-sm text-slate-500 mb-2'>Text Font</p>
						<Dropdown />
					</div>
					<div className='mb-6'>
						<p className='text-sm text-slate-500 mb-2'>Icon</p>
						<div className='border border-slate-200 p-3 flex rounded-tl-md rounded-tr-md'>
							<input
								type='text'
								placeholder='Search icons'
								className='w-full focus:outline-none'
							/>
							<div className='w-full flex items-center'>
								<div className='border border-slate-200 rounded-full p-1'>
									<span className='w-4 h-4 bg-black block rounded-full'></span>
								</div>
								<input
									type='text'
									placeholder='#FFFFFF'
									className='w-full ml-4 focus:outline-none'
								/>
							</div>
						</div>

						<div className='border-x border-b border-slate-200 p-3 rounded-br-md rounded-bl-md grid grid-cols-5'>
							{phosphorIcons.map((icon, index) => (
								<button
									key={index}
									className='border border-slate-200 p-3 rounded-md'
								>
									<icon.icon />
								</button>
							))}
						</div>
					</div>
				</div>
				<div className='flex-1 bg-slate-50 p-12 flex justify-center'>
					<div
						className='w-[450px] h-[250px] flex items-center justify-center'
						style={{ background: '#62B4FF' }}
					>
						<Cake size={100} weight='duotone' color='#fff' />
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
