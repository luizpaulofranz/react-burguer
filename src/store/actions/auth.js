import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = ( authData ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}

export const authError = ( error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = ( email, pass ) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password:pass,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDSpelg2ucehtW_F3HvV3Yy0RV5SC7lo_I', authData)
        .then( res => {
            console.log(res);
            dispatch(authSuccess(res.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(authError(err));
        });
    }
}