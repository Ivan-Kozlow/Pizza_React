import React from 'react'

const categoriesNames = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

type categoriesProps = {
	valueId: number
	setValue: (i: number) => void
}

const Categories: React.FC<categoriesProps> = React.memo(({ setValue, valueId }) => {
	return (
		<div className='categories'>
			<ul>
				{categoriesNames.map((value, i) => {
					return (
						<li key={i} onClick={() => setValue(i)} className={valueId === i ? 'active' : ''}>
							{value}
						</li>
					)
				})}
			</ul>
		</div>
	)
})

export default Categories
