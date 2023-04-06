import React from 'react'
import './_pizza-block.scss'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../redux/store'
import BtnAddPizza from './Btn`s/BtnAddPizza'
import BtnToCart from './Btn`s/BtnToCart'

export const typeNames = ['Тонкое', 'Традиционное']

export type pizzaItem = {
	id: string
	imageUrl: string
	title: string
	price: number
	sizes: number[]
	types: number[]
}

const PizzaItem: React.FC<pizzaItem> = ({ id, imageUrl, title, price, sizes, types }) => {
	const [activeType, setActiveType] = React.useState(0)
	const [activeSize, setActiveSize] = React.useState(0)

	const cartItem = useSelector((state: RootState) => state.cart.products.find((obj) => obj.id === id))
	const addedCount = cartItem ? cartItem.count : 0

	return (
		<div className='pizza-block'>
			<Link to={`pizza/${id}`} className='pizza-block__image'>
				<div className='pizza-block__image'>
					<img width='260' height='260' src={imageUrl} alt='Pizza' />
				</div>
				<h4 className='pizza-block__title'>{title}</h4>
			</Link>
			<div className='pizza-block__selector'>
				<ul>
					{types.map((typeId, i) => {
						return (
							<li key={i} onClick={() => setActiveType(typeId)} className={activeType === i ? 'active' : ''}>
								{typeNames[typeId]}
							</li>
						)
					})}
				</ul>
				<ul>
					{sizes.map((size, i) => {
						return (
							<li key={i} onClick={() => setActiveSize(i)} className={activeSize === i ? 'active' : ''}>
								{size} см.
							</li>
						)
					})}
				</ul>
			</div>
			<div className='pizza-block__bottom'>
				<div className='pizza-block__price'>от {price} ₽</div>
				{addedCount === 0 ? (
					<BtnAddPizza
						id={id}
						imageUrl={imageUrl}
						title={title}
						price={price}
						sizes={sizes}
						types={types}
						activeSize={activeSize}
						activeType={activeType}
					/>
				) : (
					<BtnToCart />
				)}
			</div>
		</div>
	)
}

export default PizzaItem
