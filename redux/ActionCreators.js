import * as ActionTypes from './ActionTypes'; //* wildcard, lets you import all named exports from "ActionTypes" at once
import { baseUrl } from '../shared/baseUrl';

export const fetchItems = () => dispatch => { //Able to use an arrow function wrapped in an arrow function due to enabling Redux Thunk. This allows the "dispatch" method to be passed to the inner function. 'dispatch' is a built in method from the Redux Store, since 'thunk' is activated in the 'createStore' function via 'applyMiddleware' argument, it gains access to the 'dispatch' method and allows it to be passed here via an arrow function wrapped in an arrow function .

    return fetch(baseUrl + 'itemArray') //'fetch' returns a promise that resolves to a 'response' object
            .then(response => { 
                if (response.ok) { //Response object returned by 'fetch' contains multiple things. One is an 'ok' property which is shorthand for checking that status is in the range 200-299 (something was successfully returned)
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
        .then(itemArray => dispatch(loadItems(itemArray))) //Calling 'dispatch' passes the inner argument ('loadItems') to the 'store' (since 'dispatch' is a built in method available from the Redux store when 'createStore' is called from the Redux library). The store calls the root reducer created by 'combineReducers' in the 'configureStore' file. The root reducer is a combination of all the reducer files, therefore, the 'loadItems' function/action creator is passed to the store, then to all the 'switch' cases in all reducer files, and when matched to a switch case, the appropriate reducer code is ran and the store is updated.
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