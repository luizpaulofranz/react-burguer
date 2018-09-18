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

export const logout = () => {
    // clear local token
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

// controls the expiration of our token
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000) //its miliseconds
    };
}

export const setPathRedirect = (path) => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT_PATH,
        path
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
            // store the token locally
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);
            // dispatch to store in redux
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            // trates the token timeout
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(err => {
            console.log(err);
            dispatch(authError(err.response.data.error));
        });
    }
}

// this automatically logs in if localStorage has a valid token
// dispatch it on root component (App.js)
export const authLocalStorage = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess( token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()/1000)));
            }
        }
    }
}