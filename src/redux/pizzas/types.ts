import { pizzaItem } from '../../components/PizzaItem/PizzaItem'

export type fetchPizzasArgs = {
	currentPage: number
	categoryId: number
	sortBy: string
}

export enum status {
	LOADING = 'Loading',
	SUCCESS = 'Succes',
	ERROR = 'Error',
}

export interface pizzasSliceState {
	items: pizzaItem[]
	status: status.LOADING | status.SUCCESS | status.ERROR
}
