import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, CaretUpDown, Translate } from '@phosphor-icons/react';

const LangDropdown = ({ data, selected, reference, onDropdownChange }) => {
	return (
		<div className='w-40'>
			<Listbox value={selected} onChange={onDropdownChange}>
				<div className='relative'>
					<Listbox.Button className='relative w-full cursor-pointer rounded-md bg-white py-2 pl-5 pr-8 text-left h-[40] border border-slate-200 focus:outline-accent-50'>
						<span className='block truncate'>{selected.name}</span>
						<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
							<CaretUpDown
								className='h-5 w-5 text-gray-400'
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
							{data.map((item, index) => (
								<Listbox.Option
									key={index}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active
												? 'bg-accent-50 text-accent'
												: 'text-gray-900'
										}`
									}
									value={item}>
									{({ selected }) => (
										<>
											<span
												className={`block truncate ${
													selected
														? 'font-medium'
														: 'font-normal'
												}`}>
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
											{reference.includes(
												item.language
											) ? (
												<span className='absolute inset-y-0 right-0 flex items-center pr-3 text-accent'>
													<Translate />
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

export default LangDropdown;
