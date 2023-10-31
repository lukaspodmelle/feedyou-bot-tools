import React from 'react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, CaretDown } from '@phosphor-icons/react';

const Dropdown = ({ items, selected, onDropdownChange }) => {
	return (
		<div className='w-full'>
			<Listbox value={selected} onChange={onDropdownChange}>
				<div className='relative mt-1'>
					<Listbox.Button className='relative w-full cursor-pointer border border-slate-200 rounded-md bg-white py-3 pl-3 pr-10 text-left focus:outline-none'>
						<span className='block truncate text-slate-700'>
							{selected.name}
						</span>
						<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400'>
							<CaretDown
								weight='bold'
								size={16}
								aria-hidden='true'
							/>
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<Listbox.Options className='absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20'>
							{items.map((item, index) => (
								<Listbox.Option
									key={index}
									className={({ active }) =>
										`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
											active
												? 'bg-accent-50 text-accent'
												: 'text-gray-900'
										}`
									}
									value={item}
									style={{
										fontFamily: item.name || 'inherit',
										fontWeight: item.weight || 'inherit',
									}}>
									{({ selected }) => (
										<>
											<span
												className={`block truncate text-slate-700`}>
												{item.name}
											</span>
											{selected ? (
												<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-accent'>
													<Check
														aria-hidden='true'
														weight='bold'
														size={16}
													/>
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
};

export default Dropdown;
