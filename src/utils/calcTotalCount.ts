import { productItem } from '../redux/cart/types'

export const calcTotalCount = (products: productItem[]) => {
	return products.reduce((sum, obj) => {
		return obj.count + sum
	}, 0)
}
