import * as ActionTypes from './ActionTypes'; //* wildcard, lets you import all named exports from "ActionTypes" at once
import { baseUrl } from '../shared/baseUrl';

export const fetchItems = () => dispatch => { //Able to use an arrow function wrapped in an arrow function due to enabling Redux Thunk. This allows the "dispatch" method to be passed to the inner function. 'dispatch' is a built in method from the Redux Store, since 'thunk' is activated in the 'createStore' function via 'applyMiddleware' argument, it gains access to the 'dispatch' method and allows it to be passed here via an arrow function wrapped in an arrow function .

    return fetch(baseUrl + 'itemArray') //'fetch' returns a promise that resolves to a 'response' object
            .then(response => {//First callback method for the '.then' method, handles a resolved promise from 'fetch'
                if (response.ok) { //Response object returned by 'fetch' contains multiple things. One is an 'ok' property which is shorthand for checking that status is in the range 200-299 (something was successfully returned)
                    return response;
                } else { // Enter block if the server sends a response, but the response is not in the okay HTTP response code range. This block throws an error to the ".catch" method at the end of the promise chain. 
                    const error = new Error(`Error ${response.status}: ${response.statusText}`); //'.status' and '.statusText' are properties of the response object returned by fetch.
                    error.response = response;
                    throw error;
                }
            },
            error => {// Second callback function can be added to '.then' method to handle a rejected promise from 'fetch'. Enter block if the server does not send a response (promise from 'fetch' is rejected). This block throws an error to the ".catch" method at the end of the promise chain.
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json()) //The 'response' returned from 'fetch' is not just data from the response body, it's a representation of the entire HTTP response. '.json()' method will extract the JSON response body content.
        .then(itemArray => dispatch(loadItems(itemArray))) //Calling 'dispatch' passes the inner argument ('loadItems') to the 'store' (since 'dispatch' is a built in method available from the Redux store when 'createStore' is called from the Redux library). The store calls the root reducer created by 'combineReducers' in the 'configureStore' file. The root reducer is a combination of all the reducer files, therefore, the 'loadItems' function/action creator is passed to the store, then to all the 'switch' cases in all reducer files, and when matched to a switch case, the appropriate reducer code is ran and the store is updated.
        .catch(error => dispatch(itemsFailed(error.message))); //Catches all and any errors thrown by the promise chain and passes the ".message" property of the error object to the "itemsFailed" function
};

export const loadItems = itemArray => ({ //Action for taking the fetched 'itemArray' from the server and sending the 'itemArray' to the 'itemReducer.js' file
    type: ActionTypes.LOAD_ITEMS,
    payload: itemArray //'loadItems' is called in 'fetch' / '.then' chain and that call takes the fetched 'itemArray', names it 'itemArray' and passes as an argument to 'loadItems'. Here, 'loadItems' receives the fetched 'itemArray' as an argument, renames it 'itemArray' and packages it as the value to the key 'payload' 
});

export const itemsFailed = errMess => ({ //Action for if fetching the 'itemArray' from the server fails or returns something not in the http success range
    type: ActionTypes.ITEMS_FAILED,
    payload: errMess //'itemsFailed' is called in 'fetch' / '.then' chain and that call takes any error returned by the promise chain, names it 'error' and passes the '.message' property of that 'error' as an argument to 'itemsFailed'. Here, 'itemsFailed' receives the 'error.message' as an argument, renames it 'errMess' and packages it as the value to the key 'payload' 
});

export const addItemSubmit = (item, storeName) => ({ //Action for when user touches the 'add' button in the 'addItem' <Overlay>. This action creator is called from <Main> component and is passed the 'storeName' and 'item' properties from the <Main> component local state as arguments.
    type: ActionTypes.ADD_ITEM,
    payload: { //The 'payload' for this action will be a complete item object that will be added to the "itemArray" via the reducer
        id: Date.now(), //Assign an always unique "id" which will be current milliseconds since UNIX epoch. Can not do this in the 'itemReducer.js' file because reducers are pure functions, not proper to have "random number" code in a reducer.
        storeName: storeName, //Set the "storeName" value of the item being added as what is currently in the "selectedStore" state (which is the normalized store name). 'selectedStore' state is sent from "MainComponent" in the 'addItemSubmit' call as the 2nd argument and renamed 'storeName' in the argument list above. This state is set in the "storeSelect" function in "MainComponent". Items are added with the normalized store name for the following scenario: A store is added "aLdi" (normalized store name of "aldi"), all items are added to that store with "storeName" property of "aldi", store "aLdi" is deleted, store is re-added as "Aldi" (normalized store name of "aldi"), all Items are correctly added to this store because both "aLdi" and "Aldi" have the same normalized store name.
        item: item, //Set the "item" value of the item being added as what is currently in the "addInput" state. 'addInput' state is sent from "MainComponent" in the 'addItemSubmit' call as the 1st argument and renamed 'item' in the argument list above.
        isChecked: false,
        textStyle: { //Create a "style" object and default styles that will be used by <CheckBox> to style the text after the check box. 
            textDecorationLine: 'none',
            color: 'black'
        } 
    }
});