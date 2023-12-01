import React from 'react';
import { Star } from '@phosphor-icons/react';
import { useCardStore } from '../context';

const SizeButtons = () => {
	const buttonStyles =
		'border w-full py-3 rounded-md focus:outline-none relative border-2';
	const buttonActive = 'text-accent font-bold border-accent ';
	const buttonInactive = 'border-slate-200 hover:border-slate-300';
	const nineToFive = 'w-[450px] h-[250px]';
	const twoToOne = 'w-[450px] h-[225px]';
	const fourToThree = 'w-[450px] h-[338px]';

	const { cardSize, setCardSize } = useCardStore();

	return (
		<div className='flex gap-4'>
			<button
				className={`${
					cardSize === nineToFive ? buttonActive : buttonInactive
				} ${buttonStyles}`}
				onClick={() => setCardSize(nineToFive)}>
				9:5{' '}
				<Star
					size={16}
					weight='fill'
					className='absolute top-2 right-2 text-yellow-400'
				/>
			</button>
			<button
				className={`${
					cardSize === twoToOne ? buttonActive : buttonInactive
				} ${buttonStyles}`}
				onClick={() => setCardSize(twoToOne)}>
				2:1
			</button>
			<button
				className={`${
					cardSize === fourToThree ? buttonActive : buttonInactive
				} ${buttonStyles}`}
				onClick={() => setCardSize(fourToThree)}>
				4:3
			</button>
		</div>
	);
};

export default SizeButtons;
