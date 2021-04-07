import axios from 'axios';
import * as actionTypes from './authActionTypes';
import * as settings from '../settings';

const SESSION_DURATION = settings.SESSION_DURATION;

/* Containts Authentications Action functions.
1) Retuns Action Objects
2) Return a Dipatch combination
    a) Perform an action then return Dispatch combination, which could be used
    by another function to dispatch action to the store.
*/

// 1) Return Action Objects

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authLogout = () => {
    const token = localStorage.getItem('token');
    if (token === undefined) {
        localStorage.removeItem('expirationDate');
    } else {
        axios.post(`${settings.API_SERVER}/api/auth/logout/`, {
        }, {headers: {'Authorization': `Token ${token}`}})
        .then(res => {console.log(res)})
        .catch(err => {console.log(err)});
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
    }
        
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

// 2) Return Dispatch combinations

// Logout users after expiration time
export const authCheckTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`${settings.API_SERVER}/api/auth/login/`, {
            'username': username, 'password': password 
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + SESSION_DURATION );
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(authCheckTimeout(SESSION_DURATION));
        }
        ).catch(err => {
            dispatch(authFail(err))
        });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined){
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date() ) {
                dispatch(authLogout);
            } else {
                dispatch(authSuccess(token));
                dispatch(authCheckTimeout(expirationDate.getTime() - new Date().getTime()));
            }
        }
    }
}

