import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducers/index';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const sotre = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
    ));

export default sotre;