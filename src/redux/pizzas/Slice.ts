import { createSlice } from '@reduxjs/toolkit'
import { fetchPizzas } from './async'
import { pizzasSliceState, status } from './types'

const initialState: pizzasSliceState = {
	items: [],
	status: status.LOADING,
}
export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setPizzas(state, action) {
			state.items = action.payload
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = status.LOADING
			state.items = []
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload
			state.status = status.SUCCESS
		})
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = status.ERROR
			state.items = []
		})
	},
	// extraReducers: {
	// 	[fetchPizzas.pending]: (state) => {
	// 		state.items = []
	// 	},
	// 	[fetchPizzas.fulfilled]: (state, action) => {
	// 		state.items = action.payload
	// 		state.status = 'success'
	// 	},
	// 	[fetchPizzas.rejected]: (state) => {
	// 		state.status = 'error'
	// 		state.items = []
	// 	},
	// },
})

export const { setPizzas } = pizzasSlice.actions

export default pizzasSlice.reducer
