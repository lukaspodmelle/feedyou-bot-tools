import React from 'react';
import ReactPaginate from 'react-paginate';
import {
	ArrowCounterClockwise,
	CaretLeft,
	CaretRight,
	DownloadSimple,
	Trash,
} from '@phosphor-icons/react';
import {
	Tooltip,
	ToolButton,
	LangDropdown,
	LoadingSpinner,
} from '../components';
import { languages } from '../assets/deepl-languages';
import { siteConfig } from '../siteConfig';

import { useTranslatorStore } from '../context';

const linkClassName = `w-[40px] h-[40px] flex justify-center items-center rounded-sm focus:outline-accent-50`;
const parentLinkClassName = `w-[40px] h-[40px] bg-slate-100 rounded-sm text-sm select-none`;

const TranslatorToolBar = ({ handleTrash, handleReset }) => {
	const { fixed, targetLanguage, setTargetLanguage, translatedLanguages } =
		useTranslatorStore();

	return (
		<div
			className={`${
				fixed ? 'fixed top-0 z-50' : ''
			} bg-white border-b border-slate-200 w-full px-8 flex justify-center`}
			style={{ height: siteConfig.navigation.toolsHeight }}
		>
			<div className='w-full flex justify-between items-center'>
				<div className='hidden lg:flex gap-2'>
					<Tooltip text='Remove file'>
						<ToolButton
							onButtonClick={handleTrash}
							icon={<Trash size={20} />}
						/>
					</Tooltip>
					<Tooltip text='Reset translations'>
						<ToolButton
							onButtonClick={handleReset}
							icon={<ArrowCounterClockwise size={20} />}
						/>
					</Tooltip>
				</div>
				<div className='flex gap-8'>
					{pageCount < 2 ? null : (
						<ReactPaginate
							previousLabel={<CaretLeft />}
							nextLabel={<CaretRight />}
							breakLabel={'...'}
							pageCount={pageCount}
							marginPagesDisplayed={1}
							pageRangeDisplayed={3}
							onPageChange={handlePageChange}
							containerClassName={
								'flex justify-center items-center gap-2'
							}
							pageClassName={parentLinkClassName}
							pageLinkClassName={linkClassName}
							previousClassName={parentLinkClassName}
							previousLinkClassName={linkClassName}
							nextClassName={parentLinkClassName}
							nextLinkClassName={linkClassName}
							activeClassName={'!bg-accent text-white rounded-sm'}
							breakClassName={'select-none focus:outline-none'}
							renderOnZeroPageCount={null}
						/>
					)}
					<div className='flex gap-2'>
						<LangDropdown
							data={languages}
							reference={translatedLanguages}
							selected={targetLanguage}
							onDropdownChange={(value) =>
								setTargetLanguage(value)
							}
						/>
						<button
							className='bg-accent-50 text-accent border-none py-2 px-5 rounded-md font-bold cursor-pointer flex flex-row items-center gap-4 focus:outline-accent'
							onClick={handleTranslation}
						>
							{loadingTranslation && (
								<LoadingSpinner
									ringColor='fill-accent'
									spinnerColor='stroke-white'
									size={15}
								/>
							)}
							{loadingTranslation
								? 'Translating...'
								: 'Translate'}
						</button>
					</div>

					<button
						className='hidden bg-accent text-white border-none py-2 px-5 rounded-md font-bold cursor-pointer lg:flex flex-row items-center gap-2 focus:outline-accent-50'
						onClick={handleFileExport}
					>
						Export file
						<DownloadSimple />
					</button>
				</div>
			</div>
		</div>
	);
};

export default TranslatorToolBar;
