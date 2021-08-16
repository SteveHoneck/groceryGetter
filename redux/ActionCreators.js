import * as ActionTypes from './ActionTypes'; //* wildcard, lets you import all named exports from "ActionTypes" at once
import { baseUrl } from '../shared/baseUrl';

export const fetchItems = () => dispatch => { //Able to use an arrow function wrapped in an arrow function due to enabling Redux Thunk. 

    return fetch(baseUrl + 'itemArray')
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
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
        .then( itemArray = dispatch(loadItems(itemArray)))
        .catch(error => dispatch(itemsFailed(error.message)));
};

export const loadItems = itemArray => ({
    type: ActionTypes.LOAD_ITEMS,
    payload: itemArray
});

export const itemsFailed = errMess => ({
    type: ActionTypes.ITEMS_FAILED,
    payload: errMess
});