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

// only to show the spinner
export const purchaseBurgerStart = ( ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};
''
// this is the one ASYNC action, is this guy who dispatch the SYNC actions above
export const purchaseBurger = ( orderData ) => {
    return dispatch => {
        // call the spinner
        dispatch(purchaseBurgerStart());
        // .json to create the correct collection in firebase.
        axios.post('/orders.json', orderData).then(res => {
            console.log(res.data);
            dispatch(purchaseBurgerSuccess(res.data, orderData))
        }).catch(err => {
            dispatch(purchaseBurgerFail(err))
        });
    };
};