import { combineReducers } from 'redux';
import obatReducer from './medicineReducer';

const rootReducer = combineReducers({
  obat: obatReducer,
});

export default rootReducer;
