import { createSlice } from '@reduxjs/toolkit'
import { searchSliceState } from './types'

const initialState: searchSliceState = {
	searchValue: '',
}

export const SearchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchValue(state, action) {
			state.searchValue = action.payload
		},
	},
})

export const { setSearchValue } = SearchSlice.actions
export default SearchSlice.reducer
