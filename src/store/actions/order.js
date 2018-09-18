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

// this is the one ASYNC action, is this guy who dispatch the SYNC actions above
export const purchaseBurger = ( orderData, token ) => {
    return dispatch => {
        // call the spinner
        dispatch(purchaseBurgerStart());
        // .json to create the correct collection in firebase.
        axios.post('/orders.json?auth=' + token, orderData).then(res => {
            //console.log('order Action: '+res);
            dispatch(purchaseBurgerSuccess(res.data.name, orderData))
        }).catch(err => {
            dispatch(purchaseBurgerFail(err))
        });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    };
};

export const fetchOrdersStart = ( ) => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrders = ( token, userId ) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        // Firebase query params
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get('orders.json'+queryParams)
        .then(res => {
            const serverOrders = [];
            for (let key in res.data) {
                serverOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(serverOrders));
            //this.setState({orders: serverOrders, loading: false});
        }).catch(err => {
            //this.setState({loading: false});
            dispatch(fetchOrdersFail(err));
        });
    }
};