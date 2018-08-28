import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    };
};

export const purchaseBurgerFail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    };
};

export const purchaseBurgerStart = ( orderData ) => {
    return dispatch => {
        // .json to create the correct collection in firebase.
        axios.post('/orders.json', order).then(res => {
            dispatch(purchaseBurgerSuccess(res.data, orderData))
        }).catch(err => {
            dispatch(purchaseBurgerFail(err))
        });
    };
};