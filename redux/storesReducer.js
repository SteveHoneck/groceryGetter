//Reducer for the Redux store section that contains the 'storesArray'. Takes the previous state and an action and returns the next state. Created as a stand-alone reducer (as opposed to having the reducer functions/logic for 'itemArray' and 'storesArray' in one file) so that when the application needs to change part of the Redux store, a copy of just the part of the store that needs changed can be made as opposed to having to copy the entire Redux store.

//Imports all the action types and exports the 'stores' reducer. The 'stores' reducer takes the 'stores' section of the Redux store state, initializes the state (using default function parameter syntax) if it hasn't already been initalized, takes the action that was dispatched to it, creates and returns a new state depending on the action that was dispatched, or returns the previous state if the action dispatched doesn't match any cases.

import * as ActionTypes from './ActionTypes';

//Reducer function to handle the 'stores' part of the Redux state. A part of the Redux state is created and called 'stores' and exported.
export const stores = (state = {storesArray: []}, action) => {//Reducers take 2 parameters: 1st is the state that is already in the store (The first time the reducer is called, the state will not exist. Default function prameter syntax (  state = {storesArray: []})  ) will be used to initialize the part of the state handled by this reducer if the state does not exist, this initializes the 'stores' part of the state as an object containing an empty array called 'storesArray' ). 2nd parameter is an action object. The body of the reducer funciton will check for the type of the action and return the state.
    switch (action.type){
        
        default: 
            return state; //If the 'action.type' is not matched, return the state that is already in the store.
    }

};
