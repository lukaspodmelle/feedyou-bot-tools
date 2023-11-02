import React, { useCallback, useRef } from 'react';
import { DownloadSimple } from '@phosphor-icons/react';
import { Switch } from '@headlessui/react';
import { toPng } from 'html-to-image';

import { Nav, InputText, FontsDropdown, InputColor } from '../components';
import phosphorIcons from '../assets/phosphor-icons';
import fonts from '../assets/fonts';

import { useCardStore } from '../context';

const CarouselCreator = () => {
	// Stores
	const {
		backgroundColor,
		setBackgroundColor,
		text,
		setText,
		textColor,
		setTextColor,
		textFont,
		setTextFont,
		Icon,
		setIcon,
		iconColor,
		setIconColor,
		iconsEnabled,
		setIconsEnabled,
	} = useCardStore();

	// HTML to PNG
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
			<div className='flex [height:calc(100vh-93px)] flex-col-reverse lg:flex-row'>
				<div className='Sidebar px-8 pt-8 pb-[92px] lg:w-[26rem] border-r border-slate-200 overflow-y-auto'>
					<div className='mb-6'>
						<h6>Background Color</h6>
						<InputColor
							placeholder='#FFFFFF'
							color={backgroundColor}
							onInputChange={(value) => setBackgroundColor(value)}
						/>
					</div>

					<div className='mb-6'>
						<h6>Text</h6>
						<div className='flex flex-col xs:flex-row gap-4 relative'>
							<InputText
								placeholder={'Your text'}
								value={text}
								maxLength={40}
								onInputChange={(value) => setText(value)}
							/>
							<InputColor
								placeholder='#FFFFFF'
								color={textColor}
								onInputChange={(value) => setTextColor(value)}
							/>
						</div>
					</div>

					<div className='mb-6'>
						<h6>Text Font</h6>
						<FontsDropdown
							items={fonts}
							selected={textFont}
							onDropdownChange={(value) => setTextFont(value)}
						/>
					</div>

					<div className='mb-6'>
						<h6>Icon</h6>
						<div className='IconPickerHead border border-slate-200 p-3 flex justify-between rounded-tl-md rounded-tr-md'>
							<InputColor
								placeholder='#000000'
								color={iconColor}
								onInputChange={(value) => setIconColor(value)}
								style='plain'
								isDisabled={!iconsEnabled}
							/>
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
							className={`IconPickerBody p-3 border-b border-x border-slate-200 rounded-br-md rounded-bl-md grid grid-cols-3 xs:grid-cols-5 md:grid-cols-8 lg:grid-cols-5 gap-3 overflow-y-auto h-[18rem]`}>
							{phosphorIcons.map((icon, index) => (
								<button
									key={index}
									onClick={() => setIcon(icon.icon)}
									className={`${
										iconsEnabled
											? icon.icon === Icon
												? 'border-accent focus:outline-accent'
												: 'border-slate-200 hover:border-slate-300 hover:border-2 focus:outline-slate-300'
											: ' pointer-events-none cursor-not-allowed'
									} border-2 p-3 rounded-md aspect-square flex justify-center items-center`}>
									<icon.icon
										weight='duotone'
										size={26}
										className={
											iconsEnabled
												? icon.icon === Icon
													? 'text-accent'
													: 'text-slate-600'
												: 'text-slate-300'
										}
									/>
								</button>
							))}
						</div>
					</div>
				</div>

				<div
					className='Export lg:w-[26rem] bg-accent text-white text-xl absolute bottom-0 left-0 w-full p-8 cursor-pointer flex justify-center items-center gap-4 z-50'
					onClick={handleImageExport}>
					<span className='font-bold'>Export Image</span>
					<DownloadSimple size={19} weight='bold' />
				</div>

				<div className='Editor xs:p-12 flex flex-1 justify-center bg-slate-50'>
					<div
						ref={ref}
						className='Card scale-50 xs:scale-90 lg:scale-100 w-[450px] h-[250px] flex items-center justify-center shrink-0 shadow-sm overflow-hidden'
						style={
							backgroundColor !== ''
								? { background: backgroundColor }
								: { background: '#FFFFFF' }
						}>
						<div className='flex flex-col gap-2 justify-center items-center max-w-[70%]'>
							{iconsEnabled ? (
								<Icon
									size={100}
									weight='duotone'
									color={iconColor}
								/>
							) : (
								''
							)}

							<span
								className='text-3xl text-center'
								style={{
									color: textColor,
									fontFamily: textFont.name,
									fontWeight: textFont.weight,
								}}>
								{text}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CarouselCreator;
