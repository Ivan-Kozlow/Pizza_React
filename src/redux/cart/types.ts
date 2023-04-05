export type productItem = {
	id: string
	title: string
	imageUrl: string
	price: number
	type: number
	size: number
	count: number
}

export interface cartSliceState {
	totalPrice: number
	totalCount: number
	products: productItem[]
}
