import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ children, text }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className='relative'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<AnimatePresence>
				{isHovered && (
					<motion.div
						className='absolute -bottom-12 z-40'
						initial={{ scale: 0 }}
						animate={{ scale: 1, originY: 0 }}
						exit={{ opacity: 0, transition: { duration: 0.1 } }}
					>
						<span className='absolute -top-1 left-3 w-3 h-3 bg-slate-600 rotate-45 rounded-sm'></span>
						<span className='inline-block w-max bg-slate-600 text-sm text-white py-2 px-6 border-slate-200 rounded-md pointer-events-none'>
							{text}
						</span>
					</motion.div>
				)}
			</AnimatePresence>
			{children}
		</div>
	);
};

export default Tooltip;
