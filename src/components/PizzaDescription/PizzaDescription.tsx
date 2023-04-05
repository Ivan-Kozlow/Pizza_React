import axios from 'axios'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import cls from './PizzaDescription.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../redux/cart/Slice'
import { RootState } from '../../redux/store'
import { typeNames } from '../PizzaItem/PizzaItem'

const PizzaDescription: React.FC = () => {
	const { id } = useParams()
	const [pizza, setPizza] = React.useState<{
		imageUrl: string
		title: string
		price: number
		types: number[]
		sizes: number[]
		description: string
	}>()
	const [activeType, setActiveType] = React.useState<number>(0)
	const [activeSize, setActiveSize] = React.useState<number>(0)

	const currentPizza = useSelector((state: RootState) => state.cart.products)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					`https://640442c480d9c5c7bac4139d.mockapi.io/items/${id}`
				)
				setPizza(data)
			} catch (error) {
				alert('Ошибка в получении пиццы :(')
				navigate('/')
			}
		}
		fetchPizza()
	}, [id])

	const onclickAdd = () => {
		const product = {
			id,
			title: pizza.title,
			price: pizza.price,
			imageUrl: pizza.imageUrl,
			type: pizza.types[activeType],
			size: pizza.sizes[activeSize],
		}
		dispatch(addProduct(product))
	}

	const addedCount = currentPizza[currentPizza.length - 1]
		? currentPizza[currentPizza.length - 1].count
		: 0

	if (!pizza) {
		return <>"Загрузка..."</>
	}

	return (
		<div className={cls.pizza__container}>
			<div className={cls.pizza__block}>
				<div className='pizza-block__image'>
					<img
						className='pizza-block__image'
						width='260'
						height='260'
						src={pizza.imageUrl}
						alt='Pizza'
					/>
				</div>
				<h4 className='pizza-block__title'>{pizza.title}</h4>
				<div className='pizza-block__selector'>
					<ul>
						{pizza.types.map((typeId, i) => {
							return (
								<li
									key={i}
									onClick={() => setActiveType(typeId)}
									className={activeType === i ? 'active' : ''}
								>
									{typeNames[typeId]}
								</li>
							)
						})}
					</ul>
					<ul>
						{pizza.sizes.map((size, i) => {
							return (
								<li
									key={i}
									onClick={() => setActiveSize(i)}
									className={activeSize === i ? 'active' : ''}
								>
									{size} см.
								</li>
							)
						})}
					</ul>
				</div>
				<div className='pizza-block__bottom'>
					<div className='pizza-block__price'>от {pizza.price} ₽</div>
					<button onClick={onclickAdd} className='button button--outline button--add'>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							></path>
						</svg>
						<span>Добавить</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>
			<div className={cls.pizza__description}>
				<h2>Описание</h2>
				<i className={cls.description}>{pizza.description}</i>
				<Link to={'/'}>
					<button className={`${cls.button__back} button button--outline`}>
						<span>Назад</span>
					</button>
				</Link>
			</div>
		</div>
	)
}

export default PizzaDescription
