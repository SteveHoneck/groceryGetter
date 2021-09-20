//Action types for using Redux. All the actions that the user can take that will affect the state that is held in the Redux store. 

export const LOAD_STORES = 'LOAD_STORES'; //Action for fetching the 'storesArray' from the server. ACTION CREATOR WILL NEED SERVER CALL.
export const STORES_FAILED = 'STORES_FAILED'; //Action for if fetching the 'storesArray' from the server fails
export const ADD_STORE = 'ADD_STORE'; //Action for adding a store to the 'storesArray'. ACTION CREATOR WILL NEED SERVER CALL.
//export const REMOVE_STORE = 'REMOVE_STORE';//Action for removing a store to the 'storesArray'. ACTION CREATOR WILL NEED SERVER CALL. This Action Type is not being currently used because the Action Creator to remove a store is set up to 'fetch' DELETE a store from the server then run the "LOAD_STORES" Action Type. This is due to not being able to figure out the return value of the 'fetch' DELETE call, if the return value was an updated array or the object that was deleted, either of those could passed the the Reducer via this Action Type.
export const SELECT_STORE = 'SELECT_STORE';//Action for selecting a store (updating a store object's key/values to make it look selected). Will not need server call because all store objects are set to look deselected every time the <StoreList> is initially loaded, therefore, whatever store objects come from server can always have key/values that look deselected.
export const DESELECT_STORE = 'DESELECT_STORE';//Action for deselecting a store (updating a store object's key/values to make it look deselected). Will not need server call because all store objects are set to look deselected every time the <StoreList> is initially loaded, therefore, whatever store objects come from server can always have key/values that look deselected.


export const LOAD_ITEMS = 'LOAD_ITEMS'; //Action for fetching the 'itemArray' from the server. ACTION CREATOR WILL NEED SERVER CALL.
export const ITEMS_FAILED = 'ITEMS_FAILED'; //Action for if fetching the 'itemArray' from the server fails
export const ADD_ITEM = 'ADD_ITEM'; //Action for adding an item to the 'itemArray'. ACTION CREATOR WILL NEED SERVER CALL.
//export const REMOVE_ITEMS = 'REMOVE_ITEMS';//Action for removing checked items from the 'itemArray'. ACTION CREATOR WILL NEED SERVER CALL. This Action Type is not being currently used because the Action Creator to remove an item is set up to 'fetch' DELETE an item from the server then run the "LOAD_ITEMS" Action Type. This is due to not being able to figure out the return value of the 'fetch' DELETE call, if the return value was an updated array or the object that was deleted, either of those could passed the the Reducer via this Action Type.
export const TOGGLE_ITEM_SELECT = 'TOGGLE_ITEM_SELECT';//Action for toggling the checkbox for an item. ACTION CREATOR WILL NEED SERVER CALL because want list on the server to be able to reflect if items have have their checkboxes toggled.
