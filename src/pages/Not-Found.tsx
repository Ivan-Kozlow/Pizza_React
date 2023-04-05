import cls from './Not-Found.module.scss'

const Basket = () => {
	return (
		<div className={cls.block}>
			<span className={cls.smile}>🙁</span>
			<br />
			<h2 className={cls.title}>Страница не найдена</h2>
		</div>
	)
}

export default Basket
