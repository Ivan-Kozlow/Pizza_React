import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { calcTotalCount } from '../../utils/calcTotalCount'
import { cartSliceState, productItem } from './types'

const { items, totalCount, totalPrice } = getCartFromLS()

const initialState: cartSliceState = {
	totalPrice: totalPrice,
	totalCount: totalCount,
	products: items,
}
export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct(state, action: PayloadAction<productItem>) {
			const findItemId = state.products.find((obj) => obj.id === action.payload.id)

			if (findItemId) {
				findItemId.count++
			} else {
				state.products.push({
					...action.payload,
					count: 1,
				})
			}
			state.totalCount = calcTotalCount(state.products)
			state.totalPrice = calcTotalPrice(state.products)
		},
		clearCart(state) {
			state.products = []
			state.totalPrice = 0
			state.totalCount = 0
		},
		minusProduct(state, action: PayloadAction<productItem>) {
			const findItemId = state.products.find((obj) => obj.id === action.payload.id)

			if (findItemId) {
				state.totalPrice -= findItemId.price
				state.totalCount--
				findItemId.count--
			}
		},
		removeProduct(state, action: PayloadAction<productItem>) {
			state.products = state.products.filter((obj) => obj.id !== action.payload.id)
			state.totalCount -= action.payload.count
			state.totalPrice -= action.payload.count * action.payload.price
		},
	},
})

export const selectorCart = (state: RootState) => state.cart

export const { clearCart, removeProduct, minusProduct, addProduct } = cartSlice.actions
export default cartSlice.reducer
