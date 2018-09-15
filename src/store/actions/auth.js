import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = ( token, userId ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId
    }
}

export const authError = ( error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

// executes the authentication on Firebase
export const auth = ( email, pass, isSignup ) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password:pass,
            returnSecureToken: true // must always be true
        }
        // firebase URLS to authentication with login and password
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDSpelg2ucehtW_F3HvV3Yy0RV5SC7lo_I';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDSpelg2ucehtW_F3HvV3Yy0RV5SC7lo_I';
        }
        axios.post(url, authData)
        .then( res => {
            dispatch(authSuccess(res.data.idToken, res.data.localId));
        })
        .catch(err => {
            console.log(err);
            dispatch(authError(err.response.data.error));
        });
    }
}