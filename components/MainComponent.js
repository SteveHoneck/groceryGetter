import React, { Component } from 'react';
import { STORES } from '../shared/stores';
import { DATA } from '../shared/data';
import List from './ListComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import CustomButton from './CustomButtonComponent';
import StoreList from './StoreListComponent';
import { View, ScrollView, StyleSheet, Text, TextInput, ToastAndroid } from 'react-native';
import { Overlay } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddItemOverlay from './AddItemOverlayComponent';
import AddStoreOverlay from './AddStoreOverlayComponent';


//Container component that will be parent to presentational components. Holds "itemArray", "storesArray", other state values, and functions that operate on the array/state and passes them to the various components

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemArray: [], //Initial item array. Use DATA for pre-filled array, otherwise use []
            storesArray: [],//Initial stores array. Use STORES for pre-filled array, otherwise use []          
            addItemOverlayVisible: false,
            addInput: '',//State for input from "addItem" overlay and "addStore" overlay. This same state can be used for both because they are never active at the same time
            textInputPlaceholder: 'Enter item', //State for resetting the "placeholder" value when "addItem" <Overlay> is activated (could be a constant below instead of state?)
            selectedStore: '', //State for holding the text string of storeName selected in "addItem" <Overlay>
            addStoreOverlayVisible: false, //
            addStoreTextInputPlaceholder: 'Enter store'//State for resetting the "placeholder" value when "addStore" <Overlay> is activated (could be a constant below instead of state?)
        };
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
        targetObject.textStyle.textDecorationLine = targetObject.isChecked ? targetObject.textStyle.textDecorationLine = 'line-through' : targetObject.textStyle.textDecorationLine = 'none'; //Change the "targetObject"'s "textStyle" depending on if "isChecked" is true or false (used to line-through the name of the item if the item is checked)
        targetObject.textStyle.color = targetObject.isChecked ? targetObject.textStyle.color = 'darkgray' : targetObject.textStyle.color = 'black'; //Change the "targetObject"'s "textStyle" depending on if "isChecked" is true or false (used to gray-out the name of the item if the item is checked)
        //update the array with the new changed object (splice to remove and splice to insert, or just copy whole array)
        updatedItemArray.splice(targetObjectIndex, 1); //remove the ''old'' object (the object with the "isChecked" value unchanged) from the copy of the state "itemArray"
        updatedItemArray.splice(targetObjectIndex, 0, targetObject); //put the ''new'' object (the object with the "isChecked" value that has been updated) into the copy of the state "itemArray"
        this.setState({itemArray: updatedItemArray}); //replace the current "itemArray" in state with the "updatedItemArray"
    }

    //Function to change the current state of the property "selectedStore" and to change the style properties of the selected store within "StoreListItemComponent". "selectedStore" will be a property of a new item when the item is added ((make arrow function so don't have to bind. Must be in "MainComponent" because the function operates on the state in "MainComponent")
    storeSelect = (storeName, id) => { //Receives the "storeName" (and renames it "storeName") and "id" properties as arguments from the "storesArray" object that was selected from "StoreListItemComponent"
        this.setState({selectedStore: storeName}); //replace the current string that is in "selectedStore" state which will be submitted as the "storeName" property in the "addItemSubmit" object
        
        let updatedStoresArray = this.state.storesArray;//Define "updatedStoresArray" as a variable that can be re-assigned, give it initial value of the "storesArray" that is currently in state.
        updatedStoresArray.map( storeObject => { //Iterates through the "updatedStoresArray" (which is an array of objects) and performs the following code on each object which is renamed to "storeObject"
                if (storeObject.id === id) { //If the current "storeObject" being iterated over matches the "id" that was passed in from the "StoreListItemComponent", change the following two style attributes that will make it look selected. Getting spread syntax to work will take more research....
                    storeObject.backgroundColor = "grey";
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
            storeObject.backgroundColor = "white";
            storeObject.color = 'black';
            return storeObject //Returns the "storeObject" of the current iteration to the new array "updatedStoresArray" 
        })
        this.setState({storesArray: updatedStoresArray, selectedStore: ''});//replace "storesArray" in state with the "updatedStoresArray" which has all store objects with styles that make them look not selected. Also replace the text in the "selectedStore" state with an empty string because "addItemSubmit" function checks this state to see if a store is selected.
    }

    //Function "deleteCheckedItems"  to delete all checked items (make arrow function so don't have to bind. Must be in "MainComponent" because the function operates on the state in "MainComponent")
    deleteCheckedItems = () => { 
        const updatedItemArray = this.state.itemArray.filter( obj => obj.isChecked === false ); //Make a copy of the "itemArray" in state, rename it "updatedItemArray", filters the"updateItemArray" (which at this point is what is currently in state) for all objects that have "isChecked" property as "false". This returns an array of objects that do not have their check boxes marked.
        this.setState({itemArray: updatedItemArray}); //replace the current "itemArray" in state with the "updatedItemArray" i.e. an array of all items that are unchecked
    }

    //Function to change the current state of the Add Item <Overlay>'s visibility
    toggleAddItemOverlay = () => {
        this.setState({addItemOverlayVisible: !this.state.addItemOverlayVisible});
        this.setState({textInputPlaceholder: 'Enter item', addInput: ''}) //Resets the <Input> text field in the "addItem" <Overlay>
        this.storeDeselect() //Run the "storeDeselect" function to deselect any stores that user may have selected while using <Overlay>
    }

    //Function "addItemSubmit" to submit info from "addItem" <Overlay>  (make arrow function so don't have to bind)
    addItemSubmit = () => {       
        if ((this.state.addInput === '') || (this.state.addInput ===' ')) { //A blank item will not be added. Enter statement if there is nothing in the "addInput" state which is denoted by an empty string OR a spacebar keystroke (so an 'empty' item is not added). "addInput" is initially an empty string and reset to an empty string after an item is submitted.
            ToastAndroid.showWithGravityAndOffset( //Notify user that item was not added
                'Please enter an item!',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100 //Y-offset of Toast, set to be close to typing area so User notices it
            );
        } else if (this.state.selectedStore === '') { //An item without a store will not be added. Enter statement if there is nothing in the "selectedStore" state, which is denoted by an empty string. "selectedStore" is initially an empty string.
            ToastAndroid.showWithGravityAndOffset( //Notify user that a store was not selected
                'Please select a store!',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100 //Y-offset of Toast, set to be close to typing area so User notices it
            );
        } else {//if there is both text in "addInput" and text in "selectedStore", this will be entered and the item will be submitted
            this.state.itemArray.push(
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
            ToastAndroid.showWithGravityAndOffset( //Notify user that item was added successfully
                `${this.state.addInput} added!`,
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100 //Y-offset of Toast, set to be close to typing area so User notices it
            );
            this.setState({textInputPlaceholder: 'Enter item', addInput: ''}) //Resets the <Input> text field in the "addItem" <Overlay>
        }
    } 

    //Function to change the current state of the Add Store overlay's visibility
    toggleAddStoreOverlay = () => {
        this.setState({addStoreOverlayVisible: !this.state.addStoreOverlayVisible});
        this.setState({addStoreTextInputPlaceholder: 'Enter store', addInput: ''}) //Resets the <Input> text field in the "addStore" <Overlay>
        this.storeDeselect() //Run the "storeDeselect" function to deselect any stores that user may have selected while using <Overlay>
    }

    //Function "addStoreSubmit" to submit info from "addStore" <Overlay>  (make arrow function so don't have to bind)
    addStoreSubmit = () => { //Function with two "if" statements. Outer "if" statement checks that there is ANY user input. Inner "if" statement checks if the store has already been added.
        if (this.state.addInput) { //Outer "if" statement. If the user has not entered any text, "addInput" will be an empty string which is FALSY and the outer "if" statement will not be entered (a blank item will not be added)

            let storeCheckArray = this.state.storesArray.filter( storeObject => { //This line creates a new array "storeCheckArray" to check if the store to be added is already in the "storesArray" in state. "filter" the "storesArray" in state applying the inner checks to each object in "storesArray". "storeCheckArray" will be an array of length 0 if there is no match. ""
                let storeName = storeObject.storeName.replace(/\s+/g, ''); //Remove the whitespace from the "storeName" value in the current "storeObject" object and name the resulting string "storeName". Whitespace needs to be removed because if the store was originally added with an accidental whitespace before or after the string, that store will not match with a store being added WITHOUT the accidental whitespace (i.e removes scenario of " Aldi" being entered initially, the string "Aldi" could be entered again)
                let regex = new RegExp("^[ ]*" + storeName + "[ ]*$", "i"); //Create a dynamic regex that will be used to check against the "addInput": allow any amount of whitespace before the string "storeName" (which changes based on the iteration of the "filter" method) and any amount of whitespace after. "i" is an option to make the regex case insensitive.
                return regex.test(this.state.addInput) //test the "addInput" against the criteria defined in "regex". Returns true or false: if true, "storeObject" is added to the "storeCheckArray", if "false" nothing added to "storeCheckArray"
                }
            )
            
            if ( (storeCheckArray.length) === 0 ) { //Inner "if" statement. If there is nothing in "storeCheckArray", it will have length of 0 meaning no matches, so enter "if" statment and add the store to the "storesArray" in state
                this.state.storesArray.push(
                    {
                        id: Date.now(), //Assign an always unique "id" which will be current milliseconds since UNIX epoch. 
                        storeName: this.state.addInput,//Could submit "value" from text <Input> field since it is also defined as the state of "addInput", not sure which method is better. 
                        backgroundColor: "white", //Default style to make the store appear un-selected when rendered in <StoreList>
                        color: 'black' //Default style to make the store appear un-selected when rendered in <StoreList>
                    }
                )
                ToastAndroid.showWithGravityAndOffset( //Notify user that store was added successfully
                    `${this.state.addInput} added!`,
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    0,
                    100 //Y-offset of Toast, set to be close to typing area so User notices it
                )
                this.setState({addStoretextInputPlaceholder: 'Enter store', addInput: ''}) //Resets the <Input> text field in the "addStore" <Overlay>
            } else { //If there is something in the "storeCheckArray", "else" statement will be entered
                ToastAndroid.showWithGravityAndOffset( //Notify user that store has already been added
                    `${this.state.addInput} already exists!`,
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    0,
                    100 //Y-offset of Toast, set to be close to typing area so User notices it
                )
            }

        } else { //Outer "if" statement. If no store was added, notify user to add text to the input field.
            ToastAndroid.showWithGravityAndOffset( //Notify user that store was not added
                'Please enter a store!',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100 //Y-offset of Toast, set to be close to typing area so User notices it
            );
        }
    }

    //Function "removeStore" to remove stores from the stores list from the add/remove stores overlay
    removeStore = () => { //can't pass value "id" of store object selected as in "storeSelect" function because "storeSelect" gets its arguments from the "StoreListItemComponent" "onPress" attribute which can only run 1 function / don't want to run "removeStore" when "onPress" is activated in "StoreListItemComponent".
        
        if (this.state.selectedStore === '') { //Enter statement if there is nothing in the "selectedStore" state, which is denoted by an empty string. "selectedStore" is initially an empty string and returned to an empty string every time "storeDeselect" function is called.
            ToastAndroid.showWithGravityAndOffset( //Notify user that a store was not selected
                'Please select a store!',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100 //Y-offset of Toast, set to be close to typing area so User notices it
            );
        } else {
            ToastAndroid.showWithGravityAndOffset( //Notify user that store was removed successfully
                `${this.state.selectedStore} removed!`,
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100 //Y-offset of Toast, set to be close to typing area so User notices it
            )
            const updatedStoresArray = this.state.storesArray.filter( obj => obj.storeName !== this.state.selectedStore ); //Make a copy of the "storesArray" in state, rename it "updatedStoresArray", filters the"updatedStoresArray" (which at this point is what is currently in state) for all objects that do not have the "storeName" property as that is the same as what is in state as "selectedStore". This returns an array of objects that were not selected by the user.
            this.setState({storesArray: updatedStoresArray});//replace the current "storesArray" in state with the "updatedStoresArray" i.e. an array of all items that were not selected
        }
    }

    render() {
        return ( // <List> is passed the array of items "itemArray", and the function to toggle the checkbox "checkBoxToggle" to the "List" component. <Footer> is passed the "deleteCheckedItems" function. 
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.wrapper}>
                    
                    <View style={styles.header}> 
                        <Header toggleAddStoreOverlay={this.toggleAddStoreOverlay} />
                    </View>
                    
                    <List itemArray={this.state.itemArray} storesArray={this.state.storesArray} checkBoxToggle={this.checkBoxToggle} /> 
                    
                    <View style={styles.footer}>
                        <Footer deleteCheckedItems={this.deleteCheckedItems} toggleAddItemOverlay={this.toggleAddItemOverlay}/>
                    </View>
                    
                    <View>
                        <AddItemOverlay 
                            isVisible={this.state.addItemOverlayVisible} 
                            toggleAddItemOverlay={this.toggleAddItemOverlay} 
                            placeholder={this.state.textInputPlaceholder} 
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
                            toggleAddStoreOverlay={this.toggleAddStoreOverlay}
                            placeholder={this.state.addStoreTextInputPlaceholder}
                            onChangeText={text => this.setState({addInput: text})}
                            value={this.state.addInput}
                            storesArray={this.state.storesArray} 
                            storeSelect={this.storeSelect}
                            addStoreSubmit={this.addStoreSubmit}
                            removeStore={this.removeStore} /*All state values and all functions that are needed by the <AddItemOverlay> are passed*/    
                        />
                    </View>

                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    header: { //Should "header" styles be moved to <View> in "HeaderComponent" and <View> around <Header> be removed from "MainComponent"? 
        width: '100%',
        height: 75,
        backgroundColor: 'green',
        justifyContent: 'center',
        //position: 'absolute', 
        top: 0
    },
    footer: { //Should "footer" styles be moved to <View> in "FooterComponent" and <View> around <Footer> be removed from "MainComponent"?
      width: '100%',
      height: 75,
      backgroundColor: 'green',
      justifyContent: 'center',
      position: 'absolute', //Needed to push footer to the bottom when the list of items is empty 
      bottom: 0
    },
    overlay: {

    }
  });



export default Main;