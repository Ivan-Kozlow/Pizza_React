import emptyCartImg from '../assets/img/empty-cart.png'

const HomeReject = () => {
	return (
		<div className='container container--cart'>
			<div className='cart cart--empty'>
				<h2>Возникла ошибка 😕</h2>
				<p>
					Попробуйте перезагрузить страницу.
					<br />
					Возможно ошибка у нас на сервере - уже работаем над ней 😉,
					<br />
					зайдите через пару минут
				</p>
				<img src={emptyCartImg} alt='Error on site' />
			</div>
		</div>
	)
}

export default HomeReject
