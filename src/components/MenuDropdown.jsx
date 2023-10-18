import React from 'react';
import { Popover, Transition } from '@headlessui/react';
import { CaretDown, Slideshow } from '@phosphor-icons/react';
import { Fragment } from 'react';

const solutions = [
	{
		name: 'Carousel Creator',
		description: 'Design simple carousel graphics',
		href: '##',
		icon: Slideshow,
	},
];

const MenuDropdown = () => {
	return (
		<Popover className='relative'>
			{({ open }) => (
				<>
					<Popover.Button
						className={`
					${open ? '' : 'text-opacity-90'}
					group inline-flex items-center rounded-md bg-slate-100 px-4 py-2 text-base text-slate-700 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
					>
						<span>Tools</span>
						<CaretDown
							className={`${open ? '' : 'text-opacity-70'}
					  ml-2 h-5 w-5 text-slate-700 transition duration-150 ease-in-out group-hover:text-opacity-80`}
							aria-hidden='true'
						/>
					</Popover.Button>
					<Transition
						as={Fragment}
						enter='transition ease-out duration-200'
						enterFrom='opacity-0 translate-y-1'
						enterTo='opacity-100 translate-y-0'
						leave='transition ease-in duration-150'
						leaveFrom='opacity-100 translate-y-0'
						leaveTo='opacity-0 translate-y-1'
					>
						<Popover.Panel className='md:absolute left-0 z-10 mt-3 w-screen max-w-xs px-4 sm:px-0 lg:max-w-sm'>
							<div className='overflow-hidden rounded-lg shadow-md ring-1 ring-black ring-opacity-5'>
								<div className='relative grid gap-8 bg-white p-7'>
									{solutions.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className='-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-slate-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
										>
											<div className='flex h-10 w-10 shrink-0 items-center justify-center text-accent bg-blue-100 text-lg rounded-lg sm:h-12 sm:w-12'>
												<item.icon aria-hidden='true' />
											</div>
											<div className='ml-4'>
												<p className='text-sm font-medium text-gray-900'>
													{item.name}
												</p>
												<p className='text-sm text-gray-500'>
													{item.description}
												</p>
											</div>
										</a>
									))}
								</div>
								<div className='bg-slate-50 p-4'>
									<a
										href='##'
										className='flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
									>
										<span className='flex items-center'>
											<span className='text-sm font-medium text-gray-900'>
												Documentation
											</span>
										</span>
										<span className='block text-sm text-gray-500'>
											Learn how to use bot tools
										</span>
									</a>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};

export default MenuDropdown;
