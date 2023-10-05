import React, { useState, useCallback, useRef } from 'react';
import { DownloadSimple, X, HandWaving } from '@phosphor-icons/react';
import { Nav, Input, FontsDropdown, Warning } from './components';
import { Switch } from '@headlessui/react';
import phosphorIcons from './assets/phosphor-icons';
import { toPng } from 'html-to-image';

import { useFontStore } from './context/fontStore';

const App = () => {
	// Defaults
	const defaults = {
		backgroundColor: '#006cf8',
		cardIcon: HandWaving,
		cardIconColor: '#FFFFFF',
		cardTextColor: '#FFFFFF',
	};

	// States
	const [backgroundColor, setBackgroundColor] = useState(
		defaults.backgroundColor
	);
	const [CardIcon, setCardIcon] = useState(defaults.cardIcon);
	const [cardIconColor, setCardIconColor] = useState(defaults.cardIconColor);
	const [activeIcon, setActiveIcon] = useState(defaults.cardIcon);
	const [iconsEnabled, setIconsEnabled] = useState(true);
	const [cardText, setCardText] = useState('');
	const [cardTextColor, setCardTextColor] = useState(defaults.cardTextColor);

	// Stores
	const { selectedFont } = useFontStore();

	// Handler functions
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

	const handleCardTextChange = (text) => {
		setCardText(text);
	};

	const handleCardTextColorChange = (color) => {
		setCardTextColor(color);
	};

	const handleWarning = (type) => {
		let warnMessage = '';
		switch (type) {
			case 'tooManyChars':
				warnMessage = `You've reached the maximum amount of text for this field.`;
				break;
			default:
				warnMessage = `This is a warning message.`;
		}
		return <Warning message={warnMessage} />;
	};

	// Html to png
	const ref = useRef(null);

	const handleImageExport = useCallback(() => {
		if (ref.current === null) {
			return;
		}

		toPng(ref.current, {
			cacheBust: true,
			pixelRatio: 3,
		})
			.then((dataUrl) => {
				const link = document.createElement('a');
				link.download = 'carousel-image.png';
				link.href = dataUrl;
				link.click();
			})
			.catch((err) => {
				console.log(err);
			});
	}, [ref]);

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
						<div className='flex gap-4 relative'>
							<Input
								placeholder={'Your text'}
								value={
									cardText.length > 40
										? cardText.slice(0, 40)
										: cardText
								}
								onInputChange={handleCardTextChange}
							/>

							{cardText.length > 40 &&
								handleWarning('tooManyChars')}

							<div className='border border-slate-200 rounded-md p-3  flex items-center'>
								<div className='border border-slate-200 rounded-full p-1'>
									<span
										className='w-4 h-4 block rounded-full'
										style={
											cardTextColor !== ''
												? { background: cardTextColor }
												: {
														background:
															defaults.cardTextColor,
												  }
										}></span>
								</div>
								<input
									type='text'
									placeholder='#FFFFFF'
									className='w-full ml-4 focus:outline-none'
									value={cardTextColor}
									onChange={(e) =>
										handleCardTextColorChange(
											e.target.value
										)
									}
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
						<div className='IconPickerHead border border-slate-200 p-3 flex justify-between rounded-tl-md rounded-tr-md'>
							<div className='flex items-center'>
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
									className={`${
										iconsEnabled
											? ''
											: 'disabled:text-slate-300 disabled:bg-transparent'
									} w-full ml-4 focus:outline-none`}
									value={cardIconColor}
									onChange={(e) =>
										handleCardIconColorChange(
											e.target.value
										)
									}
									disabled={!iconsEnabled && 'disabled'}
								/>
							</div>
							<Switch
								checked={iconsEnabled}
								onChange={setIconsEnabled}
								className={`${
									iconsEnabled ? 'bg-accent' : 'bg-slate-200'
								} relative inline-flex h-6 w-11 items-center rounded-full`}>
								<span
									className={`${
										iconsEnabled
											? 'translate-x-6'
											: 'translate-x-1'
									} inline-block h-4 w-4 transform rounded-full bg-white transition`}
								/>
							</Switch>
						</div>

						<div
							className={`IconPickerBody p-3 border-b border-x border-slate-200 rounded-br-md rounded-bl-md grid grid-cols-5 gap-3 overflow-y-auto h-[18rem]`}>
							{phosphorIcons.map((icon, index) => (
								<button
									key={index}
									onClick={() =>
										handleCardIconChange(icon.icon)
									}
									className={`${
										iconsEnabled
											? icon.icon === activeIcon
												? 'border-accent focus:outline-accent'
												: 'border-slate-200 hover:border-slate-300 hover:border-2 focus:outline-slate-300'
											: ' pointer-events-none cursor-not-allowed'
									} border-2 p-3 rounded-md aspect-square flex justify-center items-center`}>
									<icon.icon
										weight='duotone'
										size={26}
										color={
											iconsEnabled
												? icon.icon === activeIcon
													? '#006cf8'
													: '#475569'
												: '#cbd5e1'
										}
									/>
								</button>
							))}
						</div>
					</div>
				</div>
				<div
					className='Export md:w-[26rem] bg-accent text-white text-xl absolute bottom-0 left-0 w-full p-8 cursor-pointer flex justify-center items-center gap-4'
					onClick={handleImageExport}>
					<span className='font-bold'>Export Image</span>
					<DownloadSimple size={19} weight='bold' />
				</div>
				<div className='Editor flex-1 bg-slate-50 p-12 flex justify-center'>
					<div
						ref={ref}
						className='Card w-[450px] h-[250px] flex items-center justify-center shadow-sm overflow-hidden'
						style={
							backgroundColor !== ''
								? { background: backgroundColor }
								: { background: '#FFFFFF' }
						}>
						<div className='flex flex-col gap-2 justify-center items-center max-w-[70%]'>
							{iconsEnabled ? (
								<CardIcon
									size={100}
									weight='duotone'
									color={cardIconColor}
								/>
							) : (
								''
							)}

							<span
								className='text-3xl text-center'
								style={
									cardTextColor !== ''
										? {
												color: cardTextColor,
												fontFamily: selectedFont.name,
										  }
										: {
												color: defaults.cardTextColor,
												fontFamily: selectedFont.name,
										  }
								}>
								{cardText}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
