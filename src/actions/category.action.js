import axios from "../helpers/axios";
import { categoryConstants } from './constants';


const getAllCategory = () => {
    return async dispatch => {

        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

        const res = await axios.get('/category/getcategory');
        console.log(res);

        if (res.status == 200) {

            const { categoryList } = res.data;
            console.log(categoryList);

            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {
                    categories: categoryList
                }
            });
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: {
                    error: res.data.error
                }
            });
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST })
        try {
            const res = await axios.post('/category/create', form);
            if (res.status === 200) {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload: { category: res.data.category }
                });
            } else {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                    payload: res.data.error
                });
            }
        } catch (e) {
            if (e.response.status == 500) {
                console.log('JWT Token Expire')
            }
            console.log(e.response);
        }


    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST });
        const res = await axios.post('/category/update', form);
        if (res.status === 200) {
            dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS });
            dispatch(getAllCategory());
        } else {
            const { error } = res;
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload: { error }
            })
        }

    }
}

export const deleteCategories = (ids) => {
    return async dispatch => {
        const res = await axios.post('/category/delete', {
            payload: {
                ids
            }
        });
        if (res.status === 200) {
            dispatch(getAllCategory());
            return true;
        } else {
            return false;
        }
    }
}