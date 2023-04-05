import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.scss'
import { Home, Header } from './components/imports'

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart"*/ './pages/Cart/Cart'))
const PizzaDescription = React.lazy(
	() => import(/* webpackChunkName: "PizzaDescription"*/ './components/PizzaDescription/PizzaDescription')
)
const NotFound = React.lazy(() => import(/* webpackChunkName: "Not-Found"*/ './pages/Not-Found'))

const App: React.FC = () => {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<Suspense fallback={<>Идёт загрузка...</>}>
						<Routes>
							<Route path='' element={<Home />} />
							<Route path='/cart' element={<Cart />} />
							<Route path='/pizza/:id' element={<PizzaDescription />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Suspense>
				</div>
			</div>
		</div>
	)
}

export default App
