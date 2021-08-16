import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; //Thunk middleware library
import logger from 'redux-logger'; //Logger middleware library
import { stores } from './storesReducer'; //Import the 'stores' state object created in/by the 'storesReducer' module
import { item } from './itemReducer'; //Import the 'item' state object created in/by the 'storesReducer' module

export const ConfigureStore = () => { //Export a function called "ConfigureStore" that returns a variable "store". This variable is the result of calling the Redux function "createStore" with a "combineReducers" argument that combines all the reducers into a single root reducer
    const store = createStore( // 'createStore' is a function from 'redux' library. Creates the Redux store which holds the state (as an object tree). 'createStore' can only accept one reducer. The reducers were split so that certain parts of the store could be changed without having to make a copy of the entire store. Therefore, 'combineReducers' function supplied by Redux must be called to create one single reducer.
        combineReducers({ //Combines the state objects created in the 'storesReducer' and 'itemReducer' into a single state object for the Redux store. Pass this function an object that contains all of the reducers. The value of the key/value will define how the data from the reducer will be kept in the overall state object tree.
            item, //state object that contains the 'itemArray' and other state objects for server communication. The data from the 'itemReducer' will be kept in the overall state object tree under the key 'item'. Normally passed as ' item: item ' but can be shortened to 'item' because of ES6 shorthand.
            stores //state object that contains the 'storesArray' and other state objects for server communication.  
        }),
        applyMiddleware(thunk, logger) //Enables 'thunk' and 'logger' to work.
    );

    return store; //The 'store' has been created per the code above. The 'store' also contains a few built in methods from Redux. 'dispatch' is one of those methods, 'thunk' gains access to the 'dispatch' method when 'thunk' is called in the 'applyMiddleware' function above. This allows 'dispatch' to be used in the "ActionCreators" file. 'thunk' also allows an arrow function to be wrapped in an arrow function. 
}