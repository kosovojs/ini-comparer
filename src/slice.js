import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'files',
	initialState: {
		files: [],
	},
	reducers: {
		add: (state, { payload }) => {
			state.files.push(payload);
		},
	},
});

export const { add } = slice.actions;

export default slice.reducer;
