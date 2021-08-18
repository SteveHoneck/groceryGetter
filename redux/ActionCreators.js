import * as ActionTypes from './ActionTypes'; //* wildcard, lets you import all named exports from "ActionTypes" at once
import { baseUrl } from '../shared/baseUrl';

export const fetchItems = () => dispatch => { //Able to use an arrow function wrapped in an arrow function due to enabling Redux Thunk. This allows the "dispatch" method to be passed to the inner function. 'dispatch' comes from

    return fetch(baseUrl + 'itemArray')
            .then(response => { //'fetch' returns an 
                if (response.ok) {
                    return response;
                } else { // Enter block if the server sends a response, but the response is not in the okay HTTP response code range. This block throws an error to the ".catch" method at the end of the promise chain. 
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(itemArray => dispatch(loadItems(itemArray)))
        .catch(error => dispatch(itemsFailed(error.message))); //Catches all and any errors thrown by the promise chain and passes the ".message" property of the error object to the "itemsFailed" function
};

export const loadItems = itemArray => ({
    type: ActionTypes.LOAD_ITEMS,
    payload: itemArray
});

export const itemsFailed = errMess => ({
    type: ActionTypes.ITEMS_FAILED,
    payload: errMess
});