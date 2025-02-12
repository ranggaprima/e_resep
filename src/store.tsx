import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import medicineReducer from './reducers/medicineReducer'
import ruleReducer from './reducers/ruleReducer';
import saveResepReducer from './reducers/saveResepReducer';
import dokterReducer from './reducers/dokterReducer';

const reducer = combineReducers({
    medicine: medicineReducer,
    rule: ruleReducer,
    dokter: dokterReducer,
    saveResep: saveResepReducer,
});
  

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


let store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
