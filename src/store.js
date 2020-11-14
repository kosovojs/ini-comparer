import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import reducer from './slice';

export default configureStore({
	reducer: {
		files: reducer,
	},
	middleware: [logger],
});
