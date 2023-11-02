import React from 'react';
import { NavLink } from 'react-router-dom';
import { siteConfig } from '../siteConfig';

const tools = Object.values(siteConfig.tools);

const Nav = () => {
	return (
		<div
			style={{ height: siteConfig.navigation.navHeight }}
			className='flex gap-16 px-8 border-b border-slate-200 relative'>
			<div className='flex items-center gap-4'>
				<span className='w-[30px] h-[30px] bg-accent rounded-md flex justify-center items-center'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width={18}
						height={20}
						viewBox='0 0 18 20'
						fill='none'>
						<path
							d='M9 17.5V9.99999M9 9.99999L2.75 6.24999M9 9.99999L15.25 6.24999M9 2.49999V6.24999M15.25 13.3333L12.3333 11.6667M5.66667 11.6667L2.75 13.3333M15.5625 5.22498C15.8489 5.38787 16.0867 5.62413 16.2515 5.90945C16.4163 6.19477 16.5021 6.51884 16.5 6.84832V12.9183C16.5 13.5925 16.1308 14.2142 15.535 14.5417L9.91 18.1C9.63113 18.2531 9.31814 18.3334 9 18.3334C8.68186 18.3334 8.36887 18.2531 8.09 18.1L2.465 14.5417C2.17347 14.3823 1.9301 14.1476 1.76034 13.862C1.59058 13.5765 1.50067 13.2505 1.5 12.9183V6.84748C1.5 6.17332 1.86917 5.55248 2.465 5.22498L8.09 1.90832C8.37711 1.75001 8.69964 1.66699 9.0275 1.66699C9.35536 1.66699 9.67789 1.75001 9.965 1.90832L15.59 5.22498H15.5625ZM11.9167 7.85833C12.0443 7.93203 12.1502 8.03828 12.2234 8.16623C12.2966 8.29418 12.3345 8.43926 12.3333 8.58666V11.31C12.3333 11.4586 12.2934 11.6046 12.218 11.7326C12.1425 11.8607 12.0342 11.9662 11.9042 12.0383L9.40417 13.6358C9.2805 13.7044 9.14141 13.7404 9 13.7404C8.85859 13.7404 8.7195 13.7044 8.59583 13.6358L6.09583 12.0383C5.96597 11.9663 5.8577 11.8609 5.78225 11.733C5.7068 11.6051 5.66689 11.4593 5.66667 11.3108V8.58666C5.66666 8.4381 5.70637 8.29224 5.78168 8.16418C5.85699 8.03613 5.96516 7.93053 6.095 7.85833L8.595 6.37C8.85417 6.22583 9.17 6.22583 9.42833 6.37L11.9283 7.85916L11.9167 7.85833Z'
							stroke='white'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</span>
				<NavLink to={'/'}>
					<h1 className='text-slate-900 font-bold'>
						Feedyou Bot Tools
					</h1>
				</NavLink>
			</div>
			<div className='NavItems'>
				<ul className='flex items-center gap-8 h-full'>
					{tools.map((tool) => (
						<li
							className='text-slate-600 select-none'
							key={tool.slug}>
							<NavLink
								to={tool.slug}
								className={({ isActive }) =>
									isActive ? 'text-accent font-bold' : ''
								}>
								{tool.title}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Nav;
