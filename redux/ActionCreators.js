import * as ActionTypes from './ActionTypes'; //* wildcard, lets you import all named exports from "ActionTypes" at once
import { baseUrl } from '../shared/baseUrl';

//Action Creators for Item Array
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

//Function for Posting new item to server
export const addItemSubmit = (item, storeName) => dispatch => { //Action for when user touches the 'add' button in the <AddItemOverlay>. This action creator is called from <Main> component and is passed the 'storeName' and 'item' properties from the <Main> component local state as arguments. It will post the new item to the server and dispatch an action to update the Redux store

    const newItem = { //Create a new item object called "newItem" that will be posted to the "itemArray" in the server
        id: Date.now(), //Assign an always unique "id" which will be current milliseconds since UNIX epoch. Can not do this in the 'itemReducer.js' file because reducers are pure functions, not proper to have "random number" code in a reducer.
        storeName: storeName, //Set the "storeName" value of the item being added as what is currently in the "selectedStore" state (which is the normalized store name). 'selectedStore' state is sent from "MainComponent" in the 'addItemSubmit' call as the 2nd argument and renamed 'storeName' in the argument list above. This state is set in the "storeSelect" function in "MainComponent". Items are added with the normalized store name for the following scenario: A store is added "aLdi" (normalized store name of "aldi"), all items are added to that store with "storeName" property of "aldi", store "aLdi" is deleted, store is re-added as "Aldi" (normalized store name of "aldi"), all Items are correctly added to this store because both "aLdi" and "Aldi" have the same normalized store name. Could use ES6 syntax of "storeName" instead of "storeName: storeName"
        item: item, //Set the "item" value of the item being added as what is currently in the "addInput" state. 'addInput' state is sent from "MainComponent" in the 'addItemSubmit' call as the 1st argument and renamed 'item' in the argument list above. Could use ES6 syntax of "item" instead of "item: item"
        isChecked: false,
        textStyle: { //Create a "style" object and default styles that will be used by <CheckBox> to style the text after the check box. 
            textDecorationLine: 'none',
            color: 'black'
        }
    };

    return fetch(baseUrl + 'itemArray', { //'fetch' returns a promise that resolves to a 'response' object. First argument passed is the URL to access, second argument is an object to specify the "fetch" call as a "POST" request as opposed to a "GET" request and appropriate associated settings needed for a post request.
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => { //See notes from error handling in "fetchItems" Action Creator
                if (response.ok) {
                    return response
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
        .then(response => response.json()) //When a post request is successful, json server will send back the data that was sent in JSON format & will insert a unique ID along with it. Convert the response back to JavaScript with this ".json" method & dispatch it with the line below.
        .then(response => dispatch(addItem(response))) //Updates the redux store with the response created in the line above (an item object in JavaScript format)
        .catch(error => { //Catches any rejected promises or error "throw" 
            console.log('post item', error.message);
            alert('Your item could not be posted\nError: ' + error.message);
        });
};

//Function for adding new item to Redux store after successful server post from "addItemSubmit" action creator
export const addItem = item => ({ //Server's response (which is the item object) is passed as the argument and renamed 'item'
    type: ActionTypes.ADD_ITEM,
    payload: item //The 'payload' for this action will be a complete item object sent back from the server response that will be added to the "itemArray" via the reducer  
});


//Action Creators for Stores Array
export const fetchStores = () => dispatch => { //Able to use an arrow function wrapped in an arrow function due to enabling Redux Thunk. This allows the "dispatch" method to be passed to the inner function. 'dispatch' is a built in method from the Redux Store, since 'thunk' is activated in the 'createStore' function via 'applyMiddleware' argument, it gains access to the 'dispatch' method and allows it to be passed here via an arrow function wrapped in an arrow function .

    return fetch(baseUrl + 'storesArray') //'fetch' returns a promise that resolves to a 'response' object
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
        .then(storesArray => dispatch(loadStores(storesArray))) //Calling 'dispatch' passes the inner argument ('loadStores') to the Redux 'store' (since 'dispatch' is a built in method available from the Redux store when 'createStore' is called from the Redux library). The Redux store calls the root reducer created by 'combineReducers' in the 'configureStore' file. The root reducer is a combination of all the reducer files, therefore, the 'loadStores' function/action creator is passed to the Redux store, then to all the 'switch' cases in all reducer files, and when matched to a switch case, the appropriate reducer code is ran and the Redux store is updated.
        .catch(error => dispatch(storesFailed(error.message))); //Catches all and any errors thrown by the promise chain and passes the ".message" property of the error object to the "storesFailed" function
};

export const loadStores = storesArray => ({ //Action for taking the fetched 'storesArray' from the server and sending the 'storesArray' to the 'storesReducer.js' file
    type: ActionTypes.LOAD_STORES,
    payload: storesArray //'loadStores' is called in 'fetch' / '.then' chain and that call takes the fetched 'storesArray', names it 'storesArray' and passes as an argument to 'loadStores'. Here, 'loadStores' receives the fetched 'storesArray' as an argument, renames it 'storesArray' and packages it as the value to the key 'payload' 
});

export const storesFailed = errMess => ({ //Action for if fetching the 'storesArray' from the server fails or returns something not in the http success range
    type: ActionTypes.STORES_FAILED,
    payload: errMess //'storesFailed' is called in 'fetch' / '.then' chain and that call takes any error returned by the promise chain, names it 'error' and passes the '.message' property of that 'error' as an argument to 'storesFailed'. Here, 'storesFailed' receives the 'error.message' as an argument, renames it 'errMess' and packages it as the value to the key 'payload' 
});

//Function for Posting new store to server / checking if store is already in array on server
export const addStoreSubmit = (storeDisplayName, storeName) => dispatch => { //Action for when user touches the 'add' button in the <AddStoreOverlay>. This action creator is called from <Main> component and is passed the 'addInput' property from the <Main> component local state as 1st argument and the normailzed store name as the 2nd argument. It will post the new store to the server and dispatch an action to update the Redux store
       
    const newStore = { //Create a new store object called "newStore" that will be posted to the "storesArray" in the server
        id: Date.now(), //Assign an always unique "id" which will be current milliseconds since UNIX epoch. 
        storeDisplayName: storeDisplayName,//String AS ENTERED by user. Used for the store name displayed in the <StoreList>. Could submit "value" from text <Input> field since it is also defined as the state of "addInput", not sure which method is better. 
        storeName: storeName, //Normalized name of store with all spaces and caps removed. Used for assigning a store to an item.
        backgroundColor: "white", //Default style to make the store appear un-selected when rendered in <StoreList>
        color: 'black' //Default style to make the store appear un-selected when rendered in <StoreList>
    };
    
    return fetch(baseUrl + 'storesArray', { //'fetch' returns a promise that resolves to a 'response' object. First argument passed is the URL to access, second argument is an object to specify the "fetch" call as a "POST" request as opposed to a "GET" request and appropriate associated settings needed for a post request.
        method: "POST",
        body: JSON.stringify(newStore),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => { //See notes from error handling in "fetchItems" Action Creator
                if (response.ok) {
                    return response
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
        .then(response => response.json()) //When a post request is successful, json server will send back the data that was sent in JSON format & will insert a unique ID along with it. Convert the response back to JavaScript with this ".json" method & dispatch it with the line below.
        .then(response => dispatch(addStore(response))) //Updates the redux store with the response created in the line above (a store object in JavaScript format)
        .catch(error => { //Catches any rejected promises or error "throw" 
            console.log('post store', error.message);
            alert('Your store could not be posted\nError: ' + error.message);
        });
};

//Function for adding new store to Redux store after successful server post from "addStoreSubmit" action creator
export const addStore = store => ({ //Server's response (which is the store object) is passed as the argument and renamed 'store'
    type: ActionTypes.ADD_STORE,
    payload: store //The 'payload' for this action will be a complete store object sent back from the server response that will be added to the "storesArray" via the reducer
});

//Function to update the Redux store 'storesArray' with a new 'storesArray' where the styles of the store objects have been changed to reflect which store has been selected.
export const storeSelect = storesArray => ({ //This action creator is called from <Main> component's function called "storeSelect" and is passed the 'storesArray' argument which is renamed as 'storesArray'.
    type: ActionTypes.SELECT_STORE,
    payload: storesArray //The 'payload' for this action will be a copy of the 'storesArray' (made from the Redux store that is available in 'MainComponent.js' ) where styles of the store objects have been changed to reflect which store has been selected. Array will replace the "storesArray" in Redux state via the reducer
});
