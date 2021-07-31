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

//Container component that will be parent to presentational components. Holds "itemArray", "storesArray", other state values, and functions that operate on the array/state and passes them to the various components

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemArray: [], //Initial item array. Use DATA for pre-filled array, otherwise use []
            storesArray: [],//Initial stores array. Use STORES for pre-filled array, otherwise use []          
            addItemOverlayVisible: false,
            addInput: '',//State for input from "addItem" overlay and "addStore" overlay. This same state can be used for both because they are never active at the same time
            selectedStore: '', //State for holding the text string of storeName selected in "addItem" <Overlay>
            addStoreOverlayVisible: false, //
        };
        this.getData('itemArray', 'storesArray');  //Function to retrieve any data stored under the keys "itemArray" and "storesArray", called when the application is first constructed
    }

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

    //Function to change the current state of the property "selectedStore" and to change the style properties of the selected store within "StoreListItemComponent". "selectedStore" will be a property of a new item when the item is added ((make arrow function so don't have to bind. Must be in "MainComponent" because the function operates on the state in "MainComponent")
    storeSelect = (storeName) => { //Receives the "storeName" (and renames it "storeName") and "id" properties as arguments from the "storesArray" object that was selected from "StoreListItemComponent"
        this.setState({selectedStore: storeName}); //replace the current string that is in "selectedStore" state which will be submitted as the "storeName" property in the "addItemSubmit" object
        
        let updatedStoresArray = this.state.storesArray;//Define "updatedStoresArray" as a variable that can be re-assigned, give it initial value of the "storesArray" that is currently in state.
        updatedStoresArray.map( storeObject => { //Iterates through the "updatedStoresArray" (which is an array of objects) and performs the following code on each object which is renamed to "storeObject"
                if (storeObject.storeName === storeName) { //If the current "storeObject" being iterated over matches the "id" that was passed in from the "StoreListItemComponent", change the following two style attributes that will make it look selected. Getting spread syntax to work will take more research....
                    storeObject.backgroundColor = "grey"; //~~~!!!~~~Could create a "styles" object for these (like done in "checkBoxToggle" function) and pass entire styles object to "StoreListItemComponent", but would result is similar length code
                    storeObject.color = 'white';
                } else { //If the current "storeObject" being iterated over does not match the "id" that was passed in from the "StoreListItemComponent", change the following two style attributes that will make it look un-selected (need to perform this step to reset the text properties so it does not look like multiple things are selected). Getting spread syntax to work will take more research....
                    storeObject.backgroundColor = "white";
                    storeObject.color = 'black';
                }
                return storeObject //Returns the "storeObject" of the current iteration to the new array "updatedStoresArray" (return can't be inside "if" or "else" block or the function will stop running as soon as the firt object enters one of those blocks)
            }
        )

        this.setState({storesArray: updatedStoresArray}); //replace "storesArray" in state with the "updatedStoresArray" which has the selected store object with styles that make it look selected
    }

    //Function "storeDeselect" to reset the stores list to show nothing as selected when the Add Item  overlay or Add/Remove Stores overlay is closed
    storeDeselect = () => {
        let updatedStoresArray = this.state.storesArray.map( storeObject =>{ //Define "updatedStoresArray" as a variable that and give it initial value of the "storesArray" that is currently in state. "map" iterates through the "updatedStoresArray" (which is an array of objects) and performs the following code on each object which is renamed to "storeObject"
            storeObject.backgroundColor = "white"; //~~~!!!~~~Could create a "styles" object for these (like done in "checkBoxToggle" function) and pass entire styles object to "StoreListItemComponent", but would result is similar length code
            storeObject.color = 'black';
            return storeObject //Returns the "storeObject" of the current iteration to the new array "updatedStoresArray" 
        })
        this.setState({storesArray: updatedStoresArray, selectedStore: ''});//replace "storesArray" in state with the "updatedStoresArray" which has all store objects with styles that make them look not selected. Also replace the text in the "selectedStore" state with an empty string because "addItemSubmit" function checks this state to see if a store is selected.
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
                    storeName: this.state.selectedStore, //Set the "storeName" value of the item being added as what is currently in the "selectedStore" state
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

    //Function "addStoreSubmit" to submit info from "addStore" <Overlay>  (make arrow function so don't have to bind)
    addStoreSubmit = () => { //Function with two "if" statements. Outer "if" statement checks that there is ANY user input. Inner "if" statement checks if the store has already been added.
        let updatedStoresArray = this.state.storesArray; //Initialize "updatedStoresArray" as the stores array currently in state so that it can be changed without mutating the array in state 

        if (this.state.addInput) { //Outer "if" statement. If the user has not entered any text, "addInput" will be an empty string which is FALSY and the outer "if" statement will not be entered (a blank item will not be added)

            let storeCheckArray = this.state.storesArray.filter( storeObject => { //This line creates a new array "storeCheckArray" to check if the store to be added is already in the "storesArray" in state. "filter" the "storesArray" in state applying the inner checks to each object in "storesArray". "storeCheckArray" will be an array of length 0 if there is no match. ""
                let storeName = storeObject.storeName.replace(/\s+/g, ''); //Remove the whitespace from the "storeName" value in the current "storeObject" object and name the resulting string "storeName". Whitespace needs to be removed because if the store was originally added with an accidental whitespace before or after the string, that store will not match with a store being added WITHOUT the accidental whitespace (i.e removes scenario of " Aldi" being entered initially, the string "Aldi" could be entered again)
                let regex = new RegExp("^[ ]*" + storeName + "[ ]*$", "i"); //Create a dynamic regex that will be used to check against the "addInput": allow any amount of whitespace before the string "storeName" (which changes based on the iteration of the "filter" method) and any amount of whitespace after. "i" is an option to make the regex case insensitive.
                return regex.test(this.state.addInput) //test the "addInput" against the criteria defined in "regex". Returns true or false: if true, "storeObject" is added to the "storeCheckArray", if "false" nothing added to "storeCheckArray"
                }
            )
            
            if ( (storeCheckArray.length) === 0 ) { //Inner "if" statement. If there is nothing in "storeCheckArray", it will have length of 0 meaning no matches, so enter "if" statment and add the store to the "storesArray" in state
                updatedStoresArray.push(
                    {
                        id: Date.now(), //Assign an always unique "id" which will be current milliseconds since UNIX epoch. 
                        storeName: this.state.addInput,//Could submit "value" from text <Input> field since it is also defined as the state of "addInput", not sure which method is better. 
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

    //Function "removeStore" to remove stores from the stores list from the add/remove stores overlay
    removeStore = () => { //can't pass value "id" of store object selected as in "storeSelect" function because "storeSelect" gets its arguments from the "StoreListItemComponent" "onPress" attribute which can only run 1 function / don't want to run "removeStore" when "onPress" is activated in "StoreListItemComponent".
        
        if (this.state.selectedStore === '') { //Enter statement if there is nothing in the "selectedStore" state, which is denoted by an empty string. "selectedStore" is initially an empty string and returned to an empty string every time "storeDeselect" function is called.
            this.toast('Please select a store!');//Notify user that a store was not selected
        } else {
            this.toast(`${this.state.selectedStore} removed!`);//Notify user that store was removed successfully
            const updatedStoresArray = this.state.storesArray.filter( obj => obj.storeName !== this.state.selectedStore ); //Make a copy of the "storesArray" in state, rename it "updatedStoresArray", filters the"updatedStoresArray" (which at this point is what is currently in state) for all objects that do not have the "storeName" property as that is the same as what is in state as "selectedStore". This returns an array of objects that were not selected by the user.
            this.setState({storesArray: updatedStoresArray, selectedStore: ''}, () => {this.storeData(this.state.storesArray, 'storesArray')});//replace the current "storesArray" in state with the "updatedStoresArray" i.e. an array of all stores that were not selected AND reset the "selectedStore" state to an empty string. After that operation is completed, execute the callback function which stores the "storesArray" in state under the key 'storesArray'.
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
                            <List itemArray={this.state.itemArray} storesArray={this.state.storesArray} checkBoxToggle={this.checkBoxToggle} /> 
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
                                storesArray={this.state.storesArray} 
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
                                storesArray={this.state.storesArray} 
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



export default Main;