import axios from 'axios';

//INITIAL STATE
const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

//ACTION TYPES
const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA';
const ADD_PURCHASE = 'ADD_PURCHASE';
const REMOVE_PURCHASE = 'REMOVE_PURCHASE';

//ACTION CREATORS
export const requestBudgetData = () => {
    let data = axios.get('/api/budget-data').then(res => res.data);
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}

export const addPurchase = (price, description, category) => {
    let data = axios.post('/api/budget-data/purchase', {description, price, category})
    .then(res => res.data)
    .catch(err => console.log(err));
    return {
        type: ADD_PURCHASE,
        payload: data
    }
}

export const removePurchase = (id) => {
    let data = axios.delete(`/api/budget-data/purchase/${id}`)
    .then(res => res.data);
    return {
        type: REMOVE_PURCHASE,
        payload: data
    }
}

//REDUCER
export default function reducer(state=initialState, actionObj) {
    console.log('this ran');
    console.log(actionObj.payload);
    switch(actionObj.type) {
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return { ...state, ...actionObj.payload, loading: false }
        case REQUEST_BUDGET_DATA + '_PENDING':
            return { ...state, loading: true }
        case ADD_PURCHASE + '_FULFILLED':
            return { ...state, purchases: actionObj.payload, loading: false }
        case ADD_PURCHASE + '_PENDING':
            return { ...state, loading: true }
        case REMOVE_PURCHASE + '_FULFILLED':
            return { ...state, purchases: actionObj.payload, loading: false }
        case REMOVE_PURCHASE + '_PENDING':
            return { ...state, loading: true }
        default:
            return state;
    }
}