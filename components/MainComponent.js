import React, { Component } from 'react';
import { STORES } from '../shared/stores';
import { DATA } from '../shared/data';
import List from './ListComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { View, StyleSheet, ToastAndroid, ImageBackground } from 'react-native';//<ImageBackground> attribution: <a href="https://www.vecteezy.com/free-vector/food-pattern">Food Pattern Vectors by Vecteezy</a>
import { SafeAreaView } from 'react-native-safe-area-context';
import AddItemOverlay from './AddItemOverlayComponent';
import AddStoreOverlay from './AddStoreOverlayComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { addItemSubmit, addStoreSubmit, fetchItems, fetchStores, storeSelect, removeStoreSubmit } from '../redux/ActionCreators'
//Container component that will be parent to presentational components. Holds "itemArray", "storesArray", other state values, and functions that operate on the array/state and passes them to the various components

const mapStateToProps = state => { //'mapStateToProps' function takes the current state of the entire Redux store and adds the portion of it specified in the 'return' block to the 'props' for this component. An argument is automatically passed to the 'mapStateToProps' function by the 'connect' function ('connect' is a built in function from Redux) because the 'mapStateToProps' function is used as the first argument in the 'connect' function. The argument that is automatically passed is renamed 'state' here, but it could be renamed anything.
    return {
        itemArray: state.item.itemArray, //Assign the key "props.itemArray" to the value "state.item.itemArray". 'state' is the current state of the entire Redux store, '.item' is the object in the state under they key 'item' (state key/value object 'item' is created in the 'itemReducer' file as "const item = (state = {itemArray: [], errMess: null})", therefore, 'item' is an object containing 'itemArray' and 'errMess') 
        storesArray: state.stores.storesArray //Assign the key "props.storesArray" to the value "state.stores.storesArray". 'state' is the current state of the entire Redux store, '.stores' is the object in the state under they key 'stores' (state key/value object 'stores' is created in the 'storesReducer' file as "const stores = (state = {storesArray: [], errMess: null})", therefore, 'stores' is an object containing 'storesArray' and 'errMess') 
    };
};

const mapDispatchToProps = { //Action creators to be dispatched are imported from "ActionCreators.js" and mapped to the props object via this function
    fetchItems,
    addItemSubmit,
    fetchStores,
    addStoreSubmit,
    storeSelect,
    removeStoreSubmit
};

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //itemArray: [], //Initial item array. Use DATA for pre-filled array, otherwise use []. OR comment out line when using Redux.
            //storesArray: [],//Initial stores array. Use STORES for pre-filled array, otherwise use []. OR comment out line when using Redux.          
            addItemOverlayVisible: false,
            addInput: '',//State for input from "addItem" overlay and "addStore" overlay. This same state can be used for both because they are never active at the same time
            selectedStore: '', //State for holding the normalized text string of storeName selected in "addItem" <Overlay>
            selectedStoreDisplayName: '', //State for holding the text string of the store name as it was typed in by user
            addStoreOverlayVisible: false,
            storeId: '' //State for holding the "id" property of the store selected when the "storeSelect" function is run. Passed from "removeStore" to "removeStoreSubmit" Action Creator and used there as the URL for "fetch" DELETE
        };
        //this.removeFew(); //DEV CODE: enable this line and "removeFew" function to erase local storage
//        this.getData('itemArray', 'storesArray');  //Function to retrieve any data stored under the keys "itemArray" and "storesArray", called when the application is first constructed
    }

    componentDidMount() { //Functions to run when <Main> component is first mounted. 
        this.props.fetchItems(); //Action Creator 'fetchItems' is available to this component via 'import'. 'fetchItems' is made available as a prop to this component via 'mapDispatchToProps' function. When <Main> is mounted, 'itemArray' will be fetched from the server.
        this.props.fetchStores(); //Action Creator 'fetchStores' is available to this component via 'import'. 'fetchStores' is made available as a prop to this component via 'mapDispatchToProps' function. When <Main> is mounted, 'storesArray' will be fetched from the server.
    }

/*
    //DEV CODE: enable "removeFew" function and "this.removeFew()" line in constructor to erase local storage
    removeFew = async () => {
        const keys = ['itemArray', 'storesArray']
        try {
          await AsyncStorage.multiRemove(keys)
        } catch(e) {
          console.log('Error clearing local memory: ', e)
        }
      
        console.log('Local memory has been cleared.')
      }
*/
/*
    //Function for persistent storage of data (data for this application is the array of item objects and array of store objects)
    storeData = async (array, key) => { //Name for function "storeData" can be called anything. Pass in two arguments named "array" (expected to be an array of item objects or store objects), and "key" (expected to be a string)
        try {
            const jsonArray = JSON.stringify(array) //"AsyncStorage" library can only store string data. This line converts the array passed (named "array") in to a string using "JSON.stringify" and names the new string "jsonArray"
            await AsyncStorage.setItem(key, jsonArray) //"setItem" is from "AsyncStorage" library. This line creates a key/value pair in storage and assigns the "jsonArray" created in the line above as the value to the a key named from the "key" string passed into the "storeData" function. 
        } catch (err) { //if the storage did not work, an error is created and caught, renamed "err" and handled by the inner code
            console.log('Saving Error:', err);
            this.toast('Error saving data.');
        }
    }

    //Function for retrieval of persistently stored data 
    getData = async (keyOne, keyTwo) => {//Name for function "getData" can be called anything. Pass in two arguments named "keyOne" and "keyTwo" (expected to be strings). These strings should correspond to key/value pairs created using the "AsyncStorage.setItem" function. Function set up to take two keys as arguments because this application will only have two data objects stored that need to be retrieved (other option is to have one argument but call the function two times)
        try {
            const itemArray = await AsyncStorage.getItem(keyOne); //"AsyncStorage.getItem" is from "AsyncStorage" library. Required to be passed a key that corresponds to a value saved in storage. Value is returned in string form and named "itemArray" (when "getData" is called, "itemArray" is the first argument passed and the actual item array is the value stored corresponding to that key, therefore, naming it "itemArray" is more clear)
            const storesArray = await AsyncStorage.getItem(keyTwo);//Required to be passed a key that corresponds to a value saved in storage. Value is returned in string form and named "storesArray" (when "getData" is called, "storesArray" is the second argument passed and the actual stores array is the value stored corresponding to that key, therefore, naming it "storesArray" is more clear)
            this.setState({
                itemArray: JSON.parse(itemArray) || [], //Assign the value that was retrieved from storage and named "itemArray" to the state value of "itemArray" (must "JSON.parse" it because it was stored in string format and needs converted) OR make the state value an empty array if there was nothing in storage.
                storesArray: JSON.parse(storesArray) || []//Assign the value that was retrieved from storage and named "storesArray" to the state value of "storesArray" (must "JSON.parse" it because it was stored in string format and needs converted) OR make the state value an empty array if there was nothing in storage.
            }); 
        } catch (err) {//if the retrieval did not work, an error is created and caught, renamed "err" and handled by the inner code
            console.log('Loading Error:', err);
            this.toast('Error loading data.');
        }
    }
*/
    //Function "toast" to be called whenever a "ToastAndriod" notification is needed. ~~~!!!~~~ Would be nice to do as a functional component as opposed to a function here (just in order to avoid another function in "MainComponent"), but it's not immediately apparent how to make that work
    toast = (message) => { //Receives a string as an argument which is named "message"
        ToastAndroid.showWithGravityAndOffset( 
            message,
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            37.5 //Vertical offset of Toast, set to be close to typing area so User notices it & in the middle of the <Header> so there is high contrast
        );
    }

    //Function "checkBoxToggle"  to check/uncheck items' boxes (made arrow function so don't have to bind). Must be in "MainComponent" because the function operates on the state in "MainComponent"
    checkBoxToggle = (id) => { //the "id" of the item being rendered is passed from "MainComponent" to "ListComponent" to "ListItemComponent". Then that "id" is passed into "checkBoxToggle" as an argument from the "ListItemComponent" and renamed here as "id" for use within this function.
        let updatedItemArray = this.state.itemArray; //make a copy of the "itemArray" in state so that it can be changed. Will later replace what is in current state
        const targetObjectIndex = this.state.itemArray.findIndex( obj => { //iterates over the objects in the "itemArray", renames each object "obj" and runs the inner function to find the array index of the object that contains a value that matches "id" and return the array index which will later be used to replace an object in the array at that exact spot
            return obj.id === id; //returns the array index of the object who's id ("obj.id") matches the "id" passed into "checkBoxToggle" function
        }) //Could this be passed from another Component?
        const targetObject = this.state.itemArray.find( obj => { //iterates over the objects in the "itemArray", renames each object "obj" and runs the inner function to check the object it see if it contains a value that matches "id" and return the whole object. Need whole object so the "isChecked" value can be changed.
            return obj.id === id; //returns the whole object who's id ("obj.id") matches the "id" passed into "checkBoxToggle" function
        })
        targetObject.isChecked = !targetObject.isChecked;//take the "targetObject" object found above and change its "isChecked" value
        targetObject.textStyle = targetObject.isChecked ? targetObject.textStyle = styles.isChecked : targetObject.textStyle = styles.isNotChecked; //Change the "targetObject"'s "textStyle" depending on if "isChecked" is true or false (used to line-through and gray out the name of the item if the item is checked)
        //update the array with the new changed object (splice to remove and splice to insert, or just copy whole array)
        updatedItemArray.splice(targetObjectIndex, 1); //remove the ''old'' object (the object with the "isChecked" value unchanged) from the copy of the state "itemArray"
        updatedItemArray.splice(targetObjectIndex, 0, targetObject); //put the ''new'' object (the object with the "isChecked" value that has been updated) into the copy of the state "itemArray"
        this.setState({itemArray: updatedItemArray}, () => {this.storeData(this.state.itemArray, 'itemArray')}); //replace the current "itemArray" in state with the "updatedItemArray". After that operation is completed, execute the callback function which stores the "itemArray" in state under the key 'itemArray'.
    }

    //Function to change the current local state values of the keys "selectedStore" & "selectedStoreDisplayName" & "storeId" and to change the style properties of the selected store within "StoreListItemComponent". "storeName" & "storeDisplayName" will be properties of a new item when the item is added. "storeId" will be passed to 'removeStore' which will then pass to 'removeStoreSubmit' Action Creator & be used as the URL for 'fetch' DELETE (make arrow function so don't have to bind. Must be in "MainComponent" because the function operates on the state in "MainComponent")
    storeSelect = (storeName, storeDisplayName, id) => { //Receives the normalized "storeName" (and renames it "storeName"), "storeDisplayName" (and renames it "storeDisplayName"), and "id" (and renames it "id") properties as arguments from the "storesArray" object that was selected in the "StoreListItemComponent"
        this.setState({selectedStore: storeName, selectedStoreDisplayName: storeDisplayName, storeId: id}); //Replace the current string that is in "selectedStore" local state which will be submitted as the "storeName" property in the "addItemSubmit" object. Replace the current string that is in the "selectedStoreDisplayName" local state which will be submitted as the "storeDisplayName" property in the "addItemSubmit" object & displayed by the toast in the "removeStore" function. Replace the current string that is in "storeId" local state which will be passed to the "removeStore" function, then to the "removeStoreSubmit" Action Creator for use as the URL for 'fetch' DELETE.
        const updatedStoresArray = this.props.storesArray.map( storeObject => { //Create a new array of store objects (based on the array of store objects that is in the Redux Store current state which is available as props) with styles to reflect which store is selected. The new array is assigned to variable "updatedStoresArray" & is created by the ".map" method. ".map" iterates through the "storesArray" that is in the Redux Store current state and performs the following code on each object (which is renamed to "storeObject") within the "storesArray".
            let updatedStoreObject = { ...storeObject }; //Use spread syntax to create a new store object called "updatedStoreObject" which is a copy of the current store object being iterated over. MUST create a new store object for this to work, if the "storeObject" being iterated over is itself modified, ".map" will mutate the original "storesArray" AND make the "updatedStoresArray" just point to the mutated array. 
            if (storeObject.storeName === storeName) { //If the current "storeObject" being iterated over matches the normalized "storeName" that was passed in from the "StoreListItemComponent", change the following two style attributes that will make it look selected.
                return {...updatedStoreObject, backgroundColor: "gray", color: 'white'} //Use spread syntax to access all key/values in "updatedStoreObject" and change the "backgroundColor" and "color". 
            } else { //If the current "storeObject" being iterated over does not match the normalized "storeName" that was passed in from the "StoreListItemComponent", change the following two style attributes that will make it look un-selected (need to perform this step to reset the text properties so it does not look like multiple things are selected).
                return {...updatedStoreObject, backgroundColor: "white", color: 'black'} //Use spread syntax to access all key/values in "updatedStoreObject" and change the "backgroundColor" and "color". 
            }
        })
        this.props.storeSelect(updatedStoresArray); //Pass the 'updatedStoresArray' to the 'storeSelect' Action Creator function. 'storeSelect' Action Creator will pass the array to Reducer which will update the Redux store.
    }

    //Function "storeDeselect" to reset the stores list to show nothing as selected when the Add Item  overlay or Add/Remove Stores overlay is closed
    storeDeselect = () => {
        const updatedStoresArray = this.props.storesArray.map( storeObject => { //Create a new array of store objects (based on the array of store objects that is in the Redux Store current state which is available as props) with styles to reflect all stores as unselected. The new array is assigned to variable "updatedStoresArray" & is created by the ".map" method. ".map" iterates through the "storesArray" that is in the Redux Store current state and performs the following code on each object (which is renamed to "storeObject") within the "storesArray".
            let updatedStoreObject = { ...storeObject }; //Use spread syntax to create a new store object called "updatedStoreObject" which is a copy of the current store object being iterated over. MUST create a new store object for this to work, if the "storeObject" being iterated over is itself modified, ".map" will mutate the original "storesArray" AND make the "updatedStoresArray" just point to the mutated array. 
            return {...updatedStoreObject, backgroundColor: "white", color: 'black'} //Use spread syntax to access all key/values in "updatedStoreObject" and change the "backgroundColor" and "color". 
        })    
        this.setState({selectedStore: '', selectedStoreDisplayName: '', storeId: ''});//Replace the text in the "selectedStore" state with an empty string because "addItemSubmit" function checks this state to see if a store is selected. Without this line, user could add an item without touching a store because in the backgroud, a store is selected but not displayed as selected. Replace "selectedStoreDisplayName" and "storeId" with empty string for clean up only, this doesn't need done as the code is written now, but it would be messy to leave information for a store that is no longer selected in these two states .
        this.props.storeSelect(updatedStoresArray); //Pass the 'updatedStoresArray' to the 'storeSelect' Action Creator function. 'storeSelect' Action Creator will pass the array to Reducer which will update the Redux store.
    }

    //Function "deleteCheckedItems"  to delete all checked items (make arrow function so don't have to bind. Must be in "MainComponent" because the function operates on the state in "MainComponent")
    deleteCheckedItems = () => { 
        const isAnytingSelected = this.state.itemArray.find( obj => obj.isChecked === true ); //Check if "itemArray" in state for anything that has been selected. ".find" will return the first object that has "isChecked = true", otherwise 'undefined' will be returned.
        if ( !isAnytingSelected ) { //If "isAnythingSelected" is falsy (i.e. ".find" returned 'undefined', which is a falsy value), tell user to select an item
            this.toast('Select an item to remove!');
        } else { //enter block if "isAnythingSelected" is truthy (i.e. ".find" returned an object)
        const updatedItemArray = this.state.itemArray.filter( obj => obj.isChecked === false ); //Make a copy of the "itemArray" in state, rename it "updatedItemArray", filters the"updateItemArray" (which at this point is what is currently in state) for all objects that have "isChecked" property as "false". This returns an array of objects that do not have their check boxes marked.
        this.setState({itemArray: updatedItemArray}, ()=>{this.storeData(this.state.itemArray, 'itemArray')}); //replace the current "itemArray" in state with the "updatedItemArray" i.e. an array of all items that are unchecked. After that operation is completed, execute the callback function which stores the "itemArray" in state under the key 'itemArray'.
        }
    }

    //Function to change the current state of an <Overlay>'s visibility
    toggleOverlay = (overlayToToggle) => { //Argument is expected to be a string that is one of the state keys used to track an <Overlay>'s visiblility ('addItemOverlayVisible' or 'addStoreOverlayVisible') and renamed "overlayToToggle". Everywhere "toggleOverlay" is passed, it is passed as an arrow function call: '() => toggleOverlay(argument)'. When it was passed as a direct function call (i.e. 'toggleOverlay(argument)' ) some instances would cause an infinate loop during rendering.
        this.setState({[overlayToToggle]: !this.state[overlayToToggle], addInput: ''}) //Toggle visibility of <Overlay> and reset the text in state that is displayed in the <TextInput> and used to add an item/store. This line calls "setState" and uses bracket notation to set the state of string that is passed into the "toggleOverlay" function. State is an object. Bracket notation references things in objects via "object[property_name]" where 'property_name' is a string. In typical dot notation 'object.property_name', 'property_name' must be a JS Identifier, not a string. Therefore, since a string is passed into this function, it can only be used to reference a state property through bracket notation.  
        this.storeDeselect() //Run the "storeDeselect" function to deselect any stores that user may have selected while using <Overlay>
    }

    //Function "addItemSubmit" to submit info from "addItem" <Overlay>  (make arrow function so don't have to bind)
    //Call the 'addItemSubmit' function from 'ActionCreators.js' (available in props) from within a function also called 'addItemSubmit' so that it in turn can be passed to the <Overlay> components. The 'addItemSubmit' function from "ActionCreators.js" is made available as a prop via the 'mapDispatchToProps' / 'connect' functions and is passed the 'addInput' and 'selectedStore' local state values as arguments. Alternate solution: call 'addItemSubmit' that is in props directly in-line in the <Overlay> component via " addItemSubmit={this.props.addItemSubmit(this.state.addInput, this.state.selectedStore)} " (did not use this method because 'addItemSubmit' is called twice (once for each <Overlay>) & 'if' checks are needed which would be messy in-line, so that line would be repeated, not DRY). Alternate solution: suscribe the <Overlay> component to the store so 'addItemSubmit' can be called directly from within the <Overlay> component, would also need to pass 'this.state.addInput' & 'this.state.selectedStore' to the <Overlay> component so 'addItemSubmit' can use them as arguments, or add 'this.state.addInput' & 'this.state.selectedStore' to the redux store.
    addItemSubmit = () => {
        if ((this.state.addInput === '') || (this.state.addInput ===' ')) { //A blank item will not be added. Enter statement if there is nothing in the "addInput" state which is denoted by an empty string OR a spacebar keystroke (so an 'empty' item is not added). "addInput" is initially an empty string and reset to an empty string after an item is submitted.
            this.toast('Please enter an item!'); //Notify user that item was not added
        } else if (this.state.selectedStore === '') { //An item without a store will not be added. Enter statement if there is nothing in the "selectedStore" state, which is denoted by an empty string. "selectedStore" is initially an empty string.
            this.toast('Please select a store!');//Notify user that a store was not selected
        } else {//if there is both text in "addInput" and text in "selectedStore", this will be entered and the 'addItemSubmit' Action Creator will be called & the item will be submitted
            this.props.addItemSubmit(this.state.addInput, this.state.selectedStore);
            this.setState({addInput: ''})//Resets the text in state that is displayed in the <TextInput> and used to add an item/store. This line could be moved to the 'itemReducer.js' file if 'addInput' was moved to the Redux store as opposed to local state.
        }
    }

    /*
    addItemSubmit = () => {       
        let updatedItemArray = this.state.itemArray; //Initialize "updatedItemArray" as the item array currently in state so that it can be changed without mutating the array in state 

        if ((this.state.addInput === '') || (this.state.addInput ===' ')) { //A blank item will not be added. Enter statement if there is nothing in the "addInput" state which is denoted by an empty string OR a spacebar keystroke (so an 'empty' item is not added). "addInput" is initially an empty string and reset to an empty string after an item is submitted.
            this.toast('Please enter an item!'); //Notify user that item was not added
        } else if (this.state.selectedStore === '') { //An item without a store will not be added. Enter statement if there is nothing in the "selectedStore" state, which is denoted by an empty string. "selectedStore" is initially an empty string.
            this.toast('Please select a store!');//Notify user that a store was not selected
        } else {//if there is both text in "addInput" and text in "selectedStore", this will be entered and the item will be submitted
            updatedItemArray.push( 
                {
                    id: Date.now(), //Assign an always unique "id" which will be current milliseconds since UNIX epoch. 
                    storeName: this.state.selectedStore, //Set the "storeName" value of the item being added as what is currently in the "selectedStore" state (which is the normalized store name). This state is set in the "storeSelect" function. Items are added with the normalized store name for the following scenario: A store is added "aLdi" (normalized store name of "aldi"), all items are added to that store with "storeName" property of "aldi", store "aLdi" is deleted, store is re-added as "Aldi" (normalized store name of "aldi"), all Items are correctly added to this store because both "aLdi" and "Aldi" have the same normalized store name.
                    item: this.state.addInput, //Could submit "value" from text <Input> field since it is also defined as the state of "addInput", not sure which method is better. 
                    isChecked: false,
                    textStyle: { //Create a "style" object and default styles that will be used by <CheckBox> to style the text after the check box. 
                        textDecorationLine: 'none',
                        color: 'black'
                    }                
                }
            )
            this.toast(`${this.state.addInput} added!`); //Notify user that item was added successfully
            this.setState({addInput: '', itemArray: updatedItemArray}, () => {this.storeData(this.state.itemArray, 'itemArray')})//Resets the text in state that is displayed in the <TextInput> and used to add an item/store, replace the current "itemArray" in state with the "updatedItemArray" i.e. an array with the additional item object. After that operation is completed, execute the callback function which stores the "itemArray" in state under the key 'itemArray'.
        }
    } 
*/
    //Function "addStoreSubmit" to submit info from "addStore" <Overlay>  (make arrow function so don't have to bind)
    //Call the 'addStoreSubmit' function from 'ActionCreators.js' (available in props) from within a function also called 'addStoreSubmit' so that it in turn can be passed to the <Overlay> components. The 'addStoreSubmit' function from "ActionCreators.js" is made available as a prop via the 'mapDispatchToProps' / 'connect' functions and is passed the 'addInput' local state value as argument. Alternate solution: call 'addStoreSubmit' that is in props directly in-line in the <Overlay> component via " addStoreSubmit={this.props.addStoreSubmit(this.state.addInput)} " (did not use this method because 'addStoreSubmit' is called twice (once for each <Overlay>) & 'if' checks are needed which would be messy in-line, so that line would be repeated, not DRY). Alternate solution: suscribe the <Overlay> component to the store so 'addStoreSubmit' can be called directly from within the <Overlay> component, would also need to pass 'this.state.addInput' to the <Overlay> component so 'addStoreSubmit' can use it as argument, or add 'this.state.addInput' to the redux store.
    addStoreSubmit = () => {
        if (this.state.addInput) { //Outer "if" statement. If the user has not entered any text, "addInput" will be an empty string which is FALSY and the outer "if" statement will not be entered (a blank item will not be added)
            
            let storeName = this.state.addInput.toLowerCase().replace(/\s+/g, '') //Normalized store name: variable "storeName" is created which takes what the user input as the store's name, sets it all to lowercase and removes all whitespace (+ will remove chunks of whitespace at a time, with no +, each space has to be replaced individually)

            let storeCheckArray = this.props.storesArray.filter( storeObject => {//This line creates a new array "storeCheckArray" to check if the store to be added is already in the "storesArray" in Redux Store current state. "filter" the "storesArray" in the Redux store (which is available as props) by passing each object in renamed as "storeObject" 
                return storeObject.storeName === storeName; //Check if the normalized "storeName" of the "storeObject" being iterated over is equal to the normalized store name being added. "storeCheckArray" will be an array of length 0 if there is no match.
            })

            if ( (storeCheckArray.length) === 0 ) { //Inner "if" statement. If there is nothing in "storeCheckArray", it will have length of 0 meaning no matches, so enter "if" statment and call the Action Creator to add the store to the "storesArray" in the Redux store
                this.props.addStoreSubmit(this.state.addInput, storeName) //Call the 'addStoreSubmit' Action Creator that is in props and pass 2 arguments: the store name string AS ENTERED by the user (argument will be renamed 'storeDisplayName' in 'addStoreSubmit' action creator argument list), and the 'storeName' created above (argument will be also named 'storeName' in 'addStoreSubmit' action creator argument list)
                this.setState({addInput: ''})//Resets the text in state that is displayed in the <TextInput> and used to add a store/item.
            } else { //If there is something in the "storeCheckArray", "else" statement will be entered
                this.toast(`${this.state.addInput} already exists!`);//Notify user that store has already been added
            }

        } else { //Outer "if" statement. If no store was added, notify user to add text to the input field.
            this.toast('Please enter a store!');//Notify user that store was not added
        }
    }


   /* 
    addStoreSubmit = () => { //Function with two "if" statements. Outer "if" statement checks that there is ANY user input. Inner "if" statement checks if the store has already been added.
        let updatedStoresArray = this.state.storesArray; //Initialize "updatedStoresArray" as the stores array currently in state so that it can be changed without mutating the array in state 

        if (this.state.addInput) { //Outer "if" statement. If the user has not entered any text, "addInput" will be an empty string which is FALSY and the outer "if" statement will not be entered (a blank item will not be added)
            
            let storeName = this.state.addInput.toLowerCase().replace(/\s+/g, '') //Normalized store name: variable "storeName" is created which takes what the user input as the store's name, sets it all to lowercase and removes all whitespace (+ will remove chunks of whitespace at a time, with no +, each space has to be replaced individually)

            let storeCheckArray = this.state.storesArray.filter( storeObject => {//This line creates a new array "storeCheckArray" to check if the store to be added is already in the "storesArray" in state. "filter" the "storesArray" in state by passing each object in renamed as "storeObject" 
                return storeObject.storeName === storeName; //Check if the normalized "storeName" of the "storeObject" being iterated over is equal to the normalized store name being added. "storeCheckArray" will be an array of length 0 if there is no match.
            })

            if ( (storeCheckArray.length) === 0 ) { //Inner "if" statement. If there is nothing in "storeCheckArray", it will have length of 0 meaning no matches, so enter "if" statment and add the store to the "storesArray" in state
                updatedStoresArray.push(
                    {
                        id: Date.now(), //Assign an always unique "id" which will be current milliseconds since UNIX epoch. 
                        storeDisplayName: this.state.addInput,//String AS ENTERED by user. Used for the store name displayed in the <StoreList>. Could submit "value" from text <Input> field since it is also defined as the state of "addInput", not sure which method is better. 
                        storeName: storeName, //Normalized name of store with all spaces and caps removed. Used for assigning a store to an item.
                        backgroundColor: "white", //Default style to make the store appear un-selected when rendered in <StoreList>
                        color: 'black' //Default style to make the store appear un-selected when rendered in <StoreList>
                    }
                )
                this.toast(`${this.state.addInput} added!`);//Notify user that store was added successfully
                this.setState({addInput: '', storesArray: updatedStoresArray}, () => {this.storeData(this.state.storesArray, 'storesArray')})//Resets the text in state that is displayed in the <TextInput> and used to add a store/item, replace the current "storesArray" in state with the "updatedStoresArray" i.e. an array of all stores that were not selected. After that operation is completed, execute the callback function which stores the "storesArray" in state under the key 'storesArray'.
            } else { //If there is something in the "storeCheckArray", "else" statement will be entered
                this.toast(`${this.state.addInput} already exists!`);//Notify user that store has already been added
            }

        } else { //Outer "if" statement. If no store was added, notify user to add text to the input field.
            this.toast('Please enter a store!');//Notify user that store was not added
        }
    }
    */

    //Function "removeStore" to remove stores from the <StoreListComponent> that is displayed in the <AddItemOverlay> and <AddStoreOverlay>
    removeStore = () => { //This function is passed to <AddStoreOverlay> and tied to the "onPress" for the remove button. This function checks if a store is selected, the runs the Action Creator to remove the store from the server, which in turn runs an Action Creator to re-fetch the 'storesArray' from the server (which now has 1 less store) and update the Redux Store
        if (this.state.selectedStore === '') { //Enter statement if there is nothing in the "selectedStore" state (could also check "selectedStoreDisplayName" or "storeId" states), which is denoted by an empty string. "selectedStore" is initially an empty string and returned to an empty string every time "storeDeselect" function is called.
            this.toast('Please select a store!');//Notify user that a store was not selected
        } else {
            this.props.removeStoreSubmit(this.state.storeId, this.state.selectedStoreDisplayName)//Run the 'removeStoreSubmit' Action Creator (made available as props through the "mapDispatchToProps" and "connect" functions). Pass to it the argument of the "id" (stored in state "storeId" by the 'storeSelect' function) of the store that was selected that will be used by 'fetch' DELETE as the URL to remove. Pass to it the argument of the "storeDisplayName" (stored in state "selectedStoreDisplayName" by the 'storeSelect' function) of the store that was selected that will be used by 'toast' to notify the user about what is being removed.
            this.setState({selectedStore: '', storeId: '', storeDisplayName: ''})//This line keeps the user application from messing up if the user hits the remove button 2 times in a row without selecting a store the 2nd time. If these states are not set to empty strings, when the user hits the remove button the 2nd time (without first selecting another store) 'selectedStore' state will have the info from the store that was removed the first time the user pressed the button and 'removeStore' will run again ('if' check will skipped) but fail to remove the store because it was already removed.  
        }
    }

    render() {
        return ( // <List> is passed the array of items "itemArray", and the function to toggle the checkbox "checkBoxToggle" to the "List" component. <Footer> is passed the "deleteCheckedItems" function. 
            <SafeAreaView style={styles.wrapper}>
                <ImageBackground  source={require('../assets/HealthyFood_07.jpg')} resizeMode="cover" style={styles.imageBackground} imageStyle={{opacity: 0.15}} /*Opacity must be added via "imageStyle". If added via "style", all children will inherit opacity*/ >
                    <View style={styles.wrapper}>
                        
                        <View style={styles.header}> 
                            <Header toggleOverlay={this.toggleOverlay} />
                        </View>
                        
                        <View style={styles.wrapper}>
                            <List itemArray={this.props.itemArray} storesArray={this.props.storesArray} checkBoxToggle={this.checkBoxToggle} toggleOverlay={this.toggleOverlay} /> 
                        </View>

                        <View style={styles.footer}>
                            <Footer deleteCheckedItems={this.deleteCheckedItems} toggleOverlay={this.toggleOverlay}/>
                        </View>
                        
                        <View>
                            <AddItemOverlay 
                                isVisible={this.state.addItemOverlayVisible} 
                                toggleOverlay={this.toggleOverlay} 
                                placeholder={'Add item'} 
                                onChangeText={text => this.setState({addInput: text})} 
                                value={this.state.addInput} 
                                storesArray={this.props.storesArray} 
                                storeSelect={this.storeSelect} 
                                addItemSubmit={this.addItemSubmit} /*All state values and all functions that are needed by the <AddItemOverlay> are passed*/ 
                            />
                        </View>
                        
                        <View>
                            <AddStoreOverlay 
                                isVisible={this.state.addStoreOverlayVisible}
                                toggleOverlay={this.toggleOverlay}
                                placeholder={'Add store'}
                                onChangeText={text => this.setState({addInput: text})}
                                value={this.state.addInput}
                                storesArray={this.props.storesArray} 
                                storeSelect={this.storeSelect}
                                addStoreSubmit={this.addStoreSubmit}
                                removeStore={this.removeStore} /*All state values and all functions that are needed by the <AddItemOverlay> are passed*/    
                            />
                        </View>
                    
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        justifyContent: "center",
    },
    header: { //~~~!!!~~~Should "header" styles be moved to <View> in "HeaderComponent" and <View> around <Header> be removed from "MainComponent"? 
        flex: 1, //Adds proper flex box separation from <List> and <Footer>
        width: '100%',
        maxHeight: 75, //Causes header to not 'flex' beyond 75 pixels. Result is that the separation from other components due to flex box is maintained, but the vertical size is set as opposed to being calculated by flex box.
        minHeight: 75,
        backgroundColor: 'green',
        justifyContent: 'center',
        //'position: 'absolute'' & 'top: 0' were needed for sticky header before flex box was used
    },
    footer: { //~~~!!!~~~Should "footer" styles be moved to <View> in "FooterComponent" and <View> around <Footer> be removed from "MainComponent"?
        flex: 1, //Adds proper flex box separation from <Header> and <List>
        width: '100%',
        maxHeight: 75, //Causes footer to not 'flex' beyond 75 pixels. Result is that the separation from other components due to flex box is maintained, but the vertical size is set as opposed to being calculated by flex box.
        minHeight: 75,
        backgroundColor: 'green',
        justifyContent: 'center',
        //'position: 'absolute'' & 'bottom: 0' were needed for sticky footer before flex box was used
    },
    isChecked: { //~~~!!!~~~Should this be moved to "ListItemComponent" and called differently in "checkBoxToggle"?
        textDecorationLine: 'line-through',
        color: 'darkgray'
    },
    isNotChecked: { //~~~!!!~~~Should this be moved to "ListItemComponent" and called differently in "checkBoxToggle"?
        textDecorationLine: 'none',
        color: 'black'
    }
  });



export default connect(mapStateToProps, mapDispatchToProps)(Main); //'connect' is a function from React-Redux. It allows the Main component to take its state from the Redux store. Having 'mapStateToProps' as the first argument ('mapStateToProps' is a custom function and could be named anything) results in the current state of the entire Redux store being passed to 'mapStateToProps' as an argument. 'mapStateToProps' is a function that provides a portion of the current state of the Redux store to "Main" component as part of the 'props' object. "mapDispatchToProps" was added as the second argument in order to make the "addItemSubmit" & "fetchItems" action creator functions available inside the MainComponent as a prop.