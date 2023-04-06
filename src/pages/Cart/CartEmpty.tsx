import { Link } from 'react-router-dom'
import emptyCartImg from '../../assets/img/empty-cart.png'

const CartEmpty: React.FC = () => {
	return (
		<div className='container container--cart'>
			<div className='cart cart--empty'>
				<h2>Корзина пустая 😕</h2>
				<p>
					Вероятней всего, вы не выбрали ещё ни один товар.
					<br />
					Для того, чтобы заказать пиццу, перейди на главную страницу.
				</p>
				<div className='wrapper-img'>
					<img src={emptyCartImg} width={300} height={255} alt='Empty cart' />
				</div>
				<Link to={'/'} className='button button--black'>
					<span>Вернуться назад</span>
				</Link>
			</div>
		</div>
	)
}

export default CartEmpty
