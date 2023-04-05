import { productItem } from '../redux/cart/types'

export const calcTotalPrice = (products: productItem[]) => {
	return products.reduce((sum, obj) => {
		return obj.count * obj.price + sum
	}, 0)
}
