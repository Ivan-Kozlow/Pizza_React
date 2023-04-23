import axios from 'axios'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import cls from './PizzaDescription.module.scss'

import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { typeNames } from '../PizzaItem/PizzaItem'

import BtnAddPizza from '../PizzaItem/Btn`s/BtnAddPizza'
import BtnToCart from '../PizzaItem/Btn`s/BtnToCart'

const PizzaDescription: React.FC = () => {
	const { id } = useParams()
	const [pizza, setPizza] = React.useState<{
		activeSize: number
		activeType: number
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

	const navigate = useNavigate()

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(`https://640442c480d9c5c7bac4139d.mockapi.io/items/${id}`)
				setPizza(data)
			} catch (error) {
				alert('Ошибка в получении пиццы :(')
				navigate('/')
			}
		}
		fetchPizza()
	}, [id])

	const addedCount = currentPizza[currentPizza.length - 1] && currentPizza.find((obj) => obj.id === id) ? 1 : 0

	if (!pizza) {
		return <>Загрузка...</>
	}

	return (
		<div className={cls.pizza__container}>
			<div className={cls.pizza__block}>
				<div className='pizza-block__image'>
					<img className='pizza-block__image' width='260' height='260' src={pizza.imageUrl} alt='Pizza' />
				</div>
				<h4 className='pizza-block__title'>{pizza.title}</h4>
				<div className='pizza-block__selector'>
					<ul>
						{pizza.types.map((typeId, i) => {
							return (
								<li key={i} onClick={() => setActiveType(typeId)} className={activeType === i ? 'active' : ''}>
									{typeNames[typeId]}
								</li>
							)
						})}
					</ul>
					<ul>
						{pizza.sizes.map((size, i) => {
							return (
								<li key={i} onClick={() => setActiveSize(i)} className={activeSize === i ? 'active' : ''}>
									{size} см.
								</li>
							)
						})}
					</ul>
				</div>
				<div className='pizza-block__bottom'>
					<div className='pizza-block__price'>от {pizza.price} ₽</div>
					{addedCount === 0 ? (
						<BtnAddPizza
							id={id}
							imageUrl={pizza.imageUrl}
							title={pizza.title}
							price={pizza.price}
							sizes={pizza.sizes}
							types={pizza.types}
							activeType={activeType}
							activeSize={activeSize}
						/>
					) : (
						<BtnToCart />
					)}
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
