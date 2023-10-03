import React, { useState } from 'react';
import { DownloadSimple, X, Alarm } from '@phosphor-icons/react';
import { Nav, Input, FontsDropdown } from './components';
import phosphorIcons from './assets/phosphor-icons';

const App = () => {
	// Defaults
	const defaults = {
		backgroundColor: '#006cf8',
		cardIcon: Alarm,
		cardIconColor: '#FFFFFF',
	};

	// States
	const [backgroundColor, setBackgroundColor] = useState(
		defaults.backgroundColor
	);
	const [CardIcon, setCardIcon] = useState(defaults.cardIcon);
	const [cardIconColor, setCardIconColor] = useState(defaults.cardIconColor);
	const [activeIcon, setActiveIcon] = useState(defaults.cardIcon);

	// Handle background color change
	const handleColorChange = (color) => {
		setBackgroundColor(color);
	};

	const handleCardIconChange = (icon, index) => {
		setCardIcon(icon);
		setActiveIcon(icon);
	};

	const handleCardIconColorChange = (color) => {
		setCardIconColor(color);
	};
	return (
		<>
			<Nav />
			<div className='flex [height:calc(100vh-93px)] flex-col-reverse md:flex-row'>
				<div className='Sidebar px-8 pt-8 pb-[92px] md:w-[26rem] border-r border-slate-200 relative overflow-y-auto'>
					<div className='mb-6'>
						<p className='text-sm text-slate-500 mb-2'>
							Background Color
						</p>
						<div className='border border-slate-200 rounded-md p-3 w-full flex items-center'>
							<div className='border border-slate-200 rounded-full p-1'>
								<span
									className='w-4 h-4 block rounded-full'
									style={
										backgroundColor !== ''
											? { background: backgroundColor }
											: { background: '#FFFFFF' }
									}>
									{backgroundColor === '' ? (
										<X color='#d1d9e3' />
									) : (
										''
									)}
								</span>
							</div>
							<input
								type='text'
								placeholder='#FFFFFF'
								className='w-full ml-4 focus:outline-none'
								value={backgroundColor}
								onChange={(e) =>
									handleColorChange(e.target.value)
								}
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
						<FontsDropdown />
					</div>
					<div className='mb-6'>
						<p className='text-sm text-slate-500 mb-2'>Icon</p>
						<div className='border border-slate-200 p-3 flex gap-3 rounded-tl-md rounded-tr-md'>
							<div className='w-[60%]'></div>
							<div className='w-[40%] flex items-center'>
								<div className='border border-slate-200 rounded-full p-1'>
									<span
										className='w-4 h-4 block rounded-full'
										style={
											cardIconColor !== ''
												? { background: cardIconColor }
												: { background: '#FFFFFF' }
										}>
										{cardIconColor === '' ? (
											<X color='#d1d9e3' />
										) : (
											''
										)}
									</span>
								</div>
								<input
									type='text'
									placeholder='#000000'
									className='w-full ml-4 focus:outline-none'
									value={cardIconColor}
									onChange={(e) =>
										handleCardIconColorChange(
											e.target.value
										)
									}
								/>
							</div>
						</div>

						<div className='border-x border-b border-slate-200 p-3 rounded-br-md rounded-bl-md grid grid-cols-5 gap-3 overflow-y-auto h-[18rem]'>
							{phosphorIcons.map((icon, index) => (
								<button
									key={index}
									onClick={() =>
										handleCardIconChange(icon.icon)
									}
									className={
										icon.icon === activeIcon
											? 'border-2 border-accent p-3 rounded-md aspect-square flex justify-center items-center focus:outline-accent'
											: 'border border-slate-200 p-3 rounded-md aspect-square flex justify-center items-center hover:border-slate-300 hover:border-2 focus:outline-slate-300'
									}>
									<icon.icon
										weight='duotone'
										size={26}
										color={
											icon.icon === activeIcon
												? '#006cf8'
												: '#475569'
										}
									/>
								</button>
							))}
						</div>
					</div>
				</div>
				<div
					className='Export md:w-[26rem] bg-accent text-white text-xl absolute bottom-0 left-0 w-full p-8 cursor-pointer flex justify-center items-center gap-4'
					onClick={() => {}}>
					<span className='font-bold'>Export All</span>
					<DownloadSimple size={19} weight='bold' />
				</div>
				<div className='Editor flex-1 bg-slate-50 p-12 flex justify-center'>
					<div
						className='Card w-[450px] h-[250px] flex items-center justify-center shadow-sm'
						style={
							backgroundColor !== ''
								? { background: backgroundColor }
								: { background: '#FFFFFF' }
						}>
						<CardIcon
							size={100}
							weight='duotone'
							color={cardIconColor}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
