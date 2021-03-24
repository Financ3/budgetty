import axios from 'axios';

//INITIAL STATE
const initialState = {
    email: null,
    firstName: null,
    lastName: null
};

//ACTION TYPES
const REQUEST_USER_DATA = 'REQUEST_USER_DATA';

//ACTION CREATORS
export const requestUserData = () => {
    let data = axios.get('/auth/user-data').then(res => res.data);
    return {
        type: REQUEST_USER_DATA,
        payload: data
    }
}

//REDUCER
export default function reducer(state=initialState, actionObj) {
    switch(actionObj.type) {
        case REQUEST_USER_DATA + '_FULFILLED':
            const { email, firstName, lastName } = actionObj.payload.user
            return { email, firstName, lastName };
        default:
            return state;
    }
    
}