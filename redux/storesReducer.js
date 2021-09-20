//Reducer for the Redux store section that contains the 'storesArray'. Takes the previous state and an action and returns the next state. Created as a stand-alone reducer (as opposed to having the reducer functions/logic for 'itemArray' and 'storesArray' in one file) so that when the application needs to change part of the Redux store, a copy of just the part of the store that needs changed can be made as opposed to having to copy the entire Redux store.

//Imports all the action types and exports the 'stores' reducer. The 'stores' reducer takes the 'stores' section of the Redux store state, initializes the state (using default function parameter syntax) if it hasn't already been initalized, takes the action that was dispatched to it, creates and returns a new state depending on the action that was dispatched, or returns the previous state if the action dispatched doesn't match any cases.

import * as ActionTypes from './ActionTypes';
import { ToastAndroid } from 'react-native';

//Function "toast" to be called whenever a "ToastAndriod" notification is needed. ~~~!!!~~~ Called in both 'itemReducer.js' and 'storesReducer.js' so should figure out a way to use in both reducers instead of writing at the beginning of each reducer.
toast = (message) => { //Receives a string as an argument which is named "message"
    ToastAndroid.showWithGravityAndOffset( 
        message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        37.5 //Vertical offset of Toast, set to be close to typing area so User notices it & in the middle of the <Header> so there is high contrast
    );
}

//Reducer function to handle the 'stores' part of the Redux state. A part of the Redux state is created and called 'stores' and exported.
export const stores = (state = {storesArray: [], errMess: null}, action) => {//Reducers take 2 parameters: 1st is the state that is already in the store (The first time the reducer is called, the state will not exist. Default function prameter syntax (  state = {storesArray: []})  ) will be used to initialize the part of the state handled by this reducer if the state does not exist, this initializes the 'stores' part of the state as an object containing an empty array called 'storesArray' ). 2nd parameter is an action object. The body of the reducer funciton will check for the type of the action and return the state.
    switch (action.type){
        case ActionTypes.LOAD_STORES: //Action of updating the 'stores' portion of the Redux state (which contains the 'storesArray' and an 'errMess') after the 'storesArray' has been successfully fetched from the server. The 'loadStores' Action Creator can be called when the application loads, or when a store is removed from the 'storesArray' via the 'removeStoreSubmit' Action Creator.
            if (action.payload.storeDisplayName) { //If the 'loadStores' Action Creator is called by the 'removeStoreSubmit' ActionCreator, the 'payload' object will contain a truthy value in the 'storeDisplayName' key/value. This allows the 'if' block to be entered and notify the user tha ta store was removed.
                toast(`${action.payload.storeDisplayName} removed!`); //Notify user that store was removed successfully
            }
            return {...state, storesArray: action.payload.storesArray, errMess: null}; // Return a new state updated with the 'storesArray' that was fetched from the server and stored in 'action.payload' and the 'errMess' set to 'null' because since something was sucessfully fetched from the server, there must be no error message.

        case ActionTypes.STORES_FAILED: //Action of updating the 'stores' portion of the Redux state (which contains the 'storesArray' and an 'errMess') after the 'storesArray' has been UNsuccessfully fetched from the server.
            return {...state, errMess: action.payload};// Return a new state with the 'storesArray' that was in state unchanged and an updated error message (passed as an argument named 'errMess').

        case ActionTypes.ADD_STORE: //Action of updating the 'storesArray' object of the 'stores' portion of the Redux state after the user presses the button to submit a new store.
            const store = action.payload; //Assign the payload from the action creator (the payload is a complete store object) to the variable 'store' for ease of access / less typing below.
        
            toast(`${store.storeDisplayName} added!`); //Notify user that store was added successfully
            return {...state, errMess: null, storesArray: state.storesArray.concat(store)};// Return a new state with the 'storesArray' that was in state with the new store tacked onto the end of the array via 'concat'. Set the 'errMess' to null to clear out any error messages.
        
        case ActionTypes.SELECT_STORE: //Action of updating the 'storesArray' object (update with styles to make a store look selected) of the 'stores' portion of the Redux state after a store is selected in one of the <Overlay>s.
            return {...state, errMess: null, storesArray: action.payload} // Return a new state replacing the 'storesArray' that was in state with a new 'storesArray' where the styles of the store objects have been changed to reflect which store has been selected. Set the 'errMess' to null to clear out any error messages.   
        
        /* "REMOVE_STORE" Action Type not currently being used due to not being able to figure out the return value of the 'fetch' DELETE call, if the return value was an updated array or the object that was deleted, either of those could passed the the Reducer via this Action Type. 
        
        case ActionTypes.REMOVE_STORE:
            return {...state, }
        */

        default: 
            return state; //If the 'action.type' is not matched, return the state that is already in the store.
    }

};
