import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { pizzaItem } from '../../components/PizzaItem/PizzaItem'
import { fetchPizzasArgs } from './types'

export const fetchPizzas = createAsyncThunk(
	'pizzas/fetchPizzas',
	async (params: fetchPizzasArgs) => {
		const { currentPage, categoryId, sortBy } = params
		const sort = sortBy.replace('-', '')
		const order = sortBy.includes('-')

		const { data } = await axios.get(
			`https://640442c480d9c5c7bac4139d.mockapi.io/items?page=${currentPage}&limit=4&${
				categoryId > 0 ? `category=${categoryId}` : ''
			}&sortBy=${sort}&order=${order ? 'asc' : 'desc'}`
		)
		return data as pizzaItem[]
	}
)
