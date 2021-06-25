import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import userReducer from './user.reducers';
import productReducer from './prodect.reducer';
import orderReducer from './order.reducer';
import pageReducer from './page.reducer';
import categoryReducer from './category.reducer';



const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    order: orderReducer,
    page: pageReducer
});

export default rootReducer;