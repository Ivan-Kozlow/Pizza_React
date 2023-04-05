import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './filter/Slice'
import cartSlice from './cart/Slice'
import pizzasSlice from './pizzas/Slice'
import searchSlice from './search/Slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
	reducer: {
		filter: filterSlice,
		cart: cartSlice,
		pizzas: pizzasSlice,
		search: searchSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
