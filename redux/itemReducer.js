//Reducer for the Redux store section that contains the 'itemArray'. Takes the previous state and an action and returns the next state. Created as a stand-alone reducer (as opposed to having the reducer functions/logic for 'itemArray' and 'storesArray' in one file) so that when the application needs to change part of the Redux store, a copy of just the part of the store that needs changed can be made as opposed to having to copy the entire Redux store.

//Imports all the action types and exports the 'item' reducer. The 'item' reducer takes the 'item' section of the Redux store state, initializes the state (using default function parameter syntax) if it hasn't already been initalized, takes the action that was dispatched to it, creates and returns a new state depending on the action that was dispatched, or returns the previous state if the action dispatched doesn't match any cases.

import * as ActionTypes from './ActionTypes';

//Reducer function to handle the 'item' part of the Redux store. A part of the Redux store is created and called 'item' and exported.
export const item = (state = {itemArray: [], errMess: null}, action) => {//Reducers take 2 parameters: 1st is the state that is already in the store (The first time the reducer is called, the state will not exist. Default function prameter syntax (  state = {itemArray: [], errMess: null})  ) will be used to initialize the part of the state handled by this reducer if the state does not exist, this initializes the 'item' part of the state as an object containing an empty array called 'itemArray' and the 'errMess' (which is intended to hold an error message from the server if needed) as null ). 2nd parameter is an action object. The body of the reducer function will check for the type of the action and return the state.
    switch (action.type){
        case ActionTypes.LOAD_ITEMS: //Action of updating the 'item' portion of the Redux state (which contains the 'itemArray' and an 'errMess') after the 'itemArray' has been successfully fetched from the server.
            return {...state, itemArray: action.payload, errMess: null}; // Return a new state updated with the 'itemArray' that was fetched from the server and stored in 'action.payload' and the 'errMess' set to 'null' because since something was sucessfully fetched from the server, there must be no error message.

        case ActionTypes.ITEMS_FAILED: //Action of updating the 'item' portion of the Redux state (which contains the 'itemArray' and an 'errMess') after the 'itemArray' has been UNsuccessfully fetched from the server.
            return {...state, errMess: action.payload};// Return a new state with the 'itemArray' that was in state unchanged and an updated error message (passed as an argument named 'errMess').

        default: 
            return state; //If the 'action.type' is not matched, return the state that is already in the store.
    }

};