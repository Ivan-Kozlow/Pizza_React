export enum SortPropertyEnum {
	RATING = 'rating',
	TITLE = 'title',
	PRICE = 'price',
	RATING_ASC = '-rating',
	TITLE_ASC = '-title',
	PRICE_ASC = '-price',
}

export type sortItem = {
	name: string
	sort: SortPropertyEnum
}

export interface filterBy {
	categoryId: number
	currentPage: number
	sort: string
}

export interface filterSliceState {
	categoryId: number
	currentPage: number
	sort: sortItem
}
