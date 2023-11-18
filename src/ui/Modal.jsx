import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Modal = ({
	isOpen,
	onClose,
	title,
	text,
	confirm,
	onConfirm,
	cancel,
}) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='relative z-10'
				open={isOpen}
				onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-black/25' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-sm transition-all'>
								<Dialog.Title as='h2'>{title}</Dialog.Title>
								<div className='mt-2'>
									<p className='text-slate-600'>{text}</p>
								</div>

								<div className='mt-4 flex gap-2'>
									{cancel ? (
										<button
											type='button'
											className='inline-flex focus:outline-none bg-accent-50 text-accent border-none py-2 px-5 rounded-md font-bold cursor-pointer mt-4'
											onClick={onClose}>
											{cancel}
										</button>
									) : null}
									<button
										type='button'
										className={`${
											cancel
												? 'bg-slate-100 text-slate-600'
												: 'bg-accent-50 text-accent'
										} inline-flex focus:outline-none border-none py-2 px-5 rounded-md font-bold cursor-pointer mt-4`}
										onClick={() => {
											onClose();
											onConfirm();
										}}>
										{confirm}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
export default Modal;
