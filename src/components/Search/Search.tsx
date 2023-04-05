import React from 'react'
import cls from './Search.module.scss'
import { setSearchValue } from '../../redux/search/Slice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const Search: React.FC = () => {
	const dispatch = useDispatch()
	const searchValue = useSelector((state: RootState) => state.search.searchValue)
	const inputRef = React.useRef<HTMLInputElement>(null)

	const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		inputRef.current?.focus()
		dispatch(setSearchValue(event.target.value))
	}

	return (
		<form className='search__form' action='#'>
			<label className={cls.pizzas_search}>
				<svg
					className={cls.icon}
					width='21'
					height='21'
					xmlns='http://www.w3.org/2000/svg'
					enableBackground='new 0 0 32 32'
					id='Glyph'
					version='1.1'
					viewBox='0 0 32 32'
				>
					<path
						d='M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z'
						id='XMLID_223_'
					/>
				</svg>
				<input
					ref={inputRef}
					value={searchValue}
					className={cls.input}
					onChange={setValue}
					type='text'
					placeholder='Поиск пицц ...'
				/>
				{searchValue && (
					<svg
						onClick={() => dispatch(setSearchValue(''))}
						className={cls.close_icon}
						width='17px'
						height='17px'
						viewBox='0 0 17 17'
						stroke='black'
						strokeWidth='2'
					>
						<defs />
						<g id='24-px-Icons' transform='translate(-364.000000, -124.000000)'>
							<g id='ic_cancel' transform='translate(360.000000, 120.000000)'>
								<g id='cross'>
									<g transform='translate(5.000000, 5.000000)'>
										<path d='M0,0 L14.1421356,14.1421356' id='Line' />
										<path d='M14,0 L1.77635684e-15,14' id='Line' />
									</g>
								</g>
							</g>
						</g>
					</svg>
				)}
			</label>
		</form>
	)
}

export default Search
