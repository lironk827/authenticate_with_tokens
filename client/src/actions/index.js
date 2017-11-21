import axios from 'axios';
import { browserHistory } from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, CLEAR_ERROR, SAVE_DAYS_RESULTS, UPDATE_DAYS_RESULTS, CALC_RATE} from './types';

const ROOT_URL = 'http://localhost:5000';

function onAuthSuccess(dispatch,response) {
    dispatch({type: AUTH_USER, payload:true});
    localStorage.setItem('token', response.data.token);
    browserHistory.push('/');
}

export function signinUser({email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, {email, password})
            .then(response => onAuthSuccess(dispatch, response))
            .catch(error => dispatch(authError('Wrong email or password')))
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER,
        payload: false,
    }
}

export function clearError () {
    return {
        type: CLEAR_ERROR,
        payload: ''
    }
}

export function signupUser({email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password})
            .then(response => onAuthSuccess(dispatch, response))     
            .catch(response => dispatch(authError(response.response.data.error)))           
    }
}

export function fetchUserResults() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/api/calcBusinessDays/allResults`, {headers: {authorization: localStorage.getItem('token')}})
            .then(response => {
                dispatch(updateDaysToState(response.data))
            })
    }
}

export function calculateDays({startDateString, endDateString}) {
    return function(dispatch) {
        axios({
            method: 'post',
            url: `${ROOT_URL}/api/calcBusinessDays/calculate`,
            data: {
                startDateString,
                endDateString
            },
            headers: {
                authorization: localStorage.getItem('token')
            }
          }).then( response => {
              dispatch(saveDaysToState(response.data))
          })
        }
}

function saveDaysToState(results) {
    return {
        type: SAVE_DAYS_RESULTS,
        payload: results
    }
}

function updateDaysToState(results) {
    return {
        type: UPDATE_DAYS_RESULTS,
        payload: results
    }
}

export function calculateRate(shipmentInfo) {
    return function (dispatch) {
        axios({
            method: 'post',
            url: `${ROOT_URL}/api/getRate/calculate`,
            data: shipmentInfo,
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then( response => { dispatch(saveRateToState(response.data)) })
    }
}

function saveRateToState(rate) {
    return {
        type: CALC_RATE,
        payload: rate
    }
}

