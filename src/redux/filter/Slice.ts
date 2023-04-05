import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { filterSliceState, sortItem, SortPropertyEnum } from './types'

const initialState: filterSliceState = {
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sort: SortPropertyEnum.RATING,
	},
}
export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setIndexCategor(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSelected(state, action: PayloadAction<sortItem>) {
			state.sort = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setFilters(state, action: PayloadAction<filterSliceState>) {
			state.sort = action.payload.sort
			state.currentPage = action.payload.currentPage
			state.categoryId = action.payload.categoryId
		},
	},
})

export const { setIndexCategor, setSelected, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer
