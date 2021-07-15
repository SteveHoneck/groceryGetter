import React, { Component } from 'react';
import { STORES } from '../shared/stores';
import { DATA } from '../shared/data';
import List from './ListComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import CustomButton from './CustomButtonComponent';
import StoreList from './StoreListComponent';
import { View, ScrollView, StyleSheet, Modal, Text, TextInput, ToastAndroid } from 'react-native';
import { Overlay } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';


//Container component that will be parent to presentational components. Holds "itemArray", "storesArray", other state values, and functions that operate on the array/state and passes them to the various components

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemArray: [], //Initial item array. Use DATA for pre-filled array, otherwise use []
            storesArray: [],//Initial stores array. Use STORES for pre-filled array, otherwise use []          
            addItemModalVisible: false,
            addInput: '',//State for input from "addItem" modal and "addStore" overlay. This same state can be used for both because they are never active at the same time
            textInputPlaceholder: 'Enter item', //State for resetting the "placeholder" value when "addItem" <Modal> is activated (could be a constant below instead of state?)
            selectedStore: '', //State for holding the text string of storeName selected in "addItemModal"
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

    //Function "deleteCheckedItems"  to delete all checked items (make arrow function so don't have to bind. Must be in "MainComponent" because the function operates on the state in "MainComponent")
    deleteCheckedItems = () => { 
        const updatedItemArray = this.state.itemArray.filter( obj => obj.isChecked === false ); //Make a copy of the "itemArray" in state, rename it "updatedItemArray", filters the"updateItemArray" (which at this point is what is currently in state) for all objects that have "isChecked" property as "false". This returns an array of objects that do not have their check boxes marked.
        this.setState({itemArray: updatedItemArray}); //replace the current "itemArray" in state with the "updatedItemArray" i.e. an array of all items that are unchecked
    }

    //Function to change the current state of the Add Item modal's visibility
    toggleAddItemModal = () => {
        this.setState({addItemModalVisible: !this.state.addItemModalVisible});
        this.setState({textInputPlaceholder: 'Enter item', addInput: ''}) //Resets the <Input> text field in the "addItem" <Modal>
    }

    //Function "addItemSubmit" to submit info from "addItem" modal  (make arrow function so don't have to bind)
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
                isChecked: false
                }
            )
            ToastAndroid.showWithGravityAndOffset( //Notify user that item was added successfully
                `${this.state.addInput} added!`,
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100 //Y-offset of Toast, set to be close to typing area so User notices it
            );
            this.setState({textInputPlaceholder: 'Enter item', addInput: ''}) //Resets the <Input> text field in the "addItem" <Modal>
        }
    } 

    //Function to change the current state of the Add Store overlay's visibility
    toggleAddStoreOverlay = () => {
        this.setState({addStoreOverlayVisible: !this.state.addStoreOverlayVisible});
        this.setState({addStoreTextInputPlaceholder: 'Enter store', addInput: ''}) //Resets the <Input> text field in the "addStore" <Overlay>
    }

    //Function "addStoreSubmit" to submit info from "addStore" <Overlay>  (make arrow function so don't have to bind)
    addStoreSubmit = () => {
        if (this.state.addInput) { //If the user has not entered any text, "addInput" will be an empty string which is FALSY and the "if" statement will not be entered (a blank item will not be added)
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
            this.toggleAddStoreOverlay() //Close "addStore" overlay because not often will more than one store be added at a time
        } else {
            ToastAndroid.showWithGravityAndOffset( //Notify user that store was not added
                'Please enter a store!',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100 //Y-offset of Toast, set to be close to typing area so User notices it
            );
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
                        <Footer deleteCheckedItems={this.deleteCheckedItems} toggleAddItemModal={this.toggleAddItemModal}/>
                    </View>
                    
                    <View style={{flex: 1}}> 
                        <Modal
                            animationType={'slide'} //Built in, there are a few options
                            transparent={false} //Makes the modal opaque
                            visible={this.state.addItemModalVisible} //Visibility will be set to what is stored in the state "addItemModalVisible"
                            onRequestClose={() => this.toggleAddItemModal()} //Funciton that will be run when hardware back button is pressed
                        >
                            <View style={{flex: .5, marginTop: '25%'}}>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <TextInput 
                                        placeholder={this.state.textInputPlaceholder} //Text to show when nothing in entered in the text field
                                        onChangeText={text => this.setState({addInput: text})} //When text is entered into the input field, "onChangeText" assigns that text to the variable "text", passes it to the function that sets the state value of "addInput" to that text. The input field WILL accept and display entered text WITHOUT "onChangeText"
                                        value={this.state.addInput} //This is the value that will be shown and captured in the text input field. Initialized in state as an empty string so that the "placeholder" will show. Used in conjunction with "onChangeText" where "onChangeText" function sets the text input in state, "value" captures the state as the value that will be submitted. 
                                    />
                                </View>
                                <View style={{flex: 3, alignItems: 'center'}}>
                                    <Text>Select Store</Text>
                                    <StoreList storesArray={this.state.storesArray} storeSelect={this.storeSelect} /*Pass the "storesArray" and "storeSelect" function to the <StoreList> component which will pass each object in the "storesArray" and the "storeSelect" function to the <StoreItem> component*//>     
                                </View>
                                <View style={{flex: 3, alignItems: 'center'}}>
                                    <CustomButton title={null} icon={'check'} onPressFunction={this.addItemSubmit} /*Pass a "title", "icon", and the "addItemSubmit" to the <CustomButton> component. "addItemSubmit" renamed to general "onPressFunction" which is accepted by <CustomButton> so that any function can be passed to <CustomButton> without having to change <CustomButton> structure. "title" is "null" because icon only is needed*//>
                                    <CustomButton title={null} icon={'chevron-left'} onPressFunction={this.toggleAddItemModal} /*"title" is "null" because icon only is needed*//>
                                </View>
                            </View>
                        </Modal>
                    </View>
               
                    <View>
                        <Overlay 
                            isVisible={this.state.addStoreOverlayVisible}
                            onBackdropPress={this.toggleAddStoreOverlay} //Function activated when space outside the overlay is touched
                            animationType={'fade'} //Built in (from React Modal component), there are a few options
                            transparent={true} //Makes the overlay backdrop transparent
                            onRequestClose={() => this.toggleAddStoreOverlay()} //Funciton that will be run when hardware back button is pressed
                            overlayStyle={styles.overlay} //Style of the actual overlay
                        >
                            <View>
                                <Text>Add Store</Text>
                                <TextInput
                                    placeholder={this.state.addStoreTextInputPlaceholder}//Text to show when nothing in entered in the text field
                                    onChangeText={text => this.setState({addInput: text})}//Operates in same manner as "addItem"
                                    value={this.state.addInput}//Operates in same manner as "addItem"
                                />
                            </View>

                            <View>
                                <CustomButton title={null} icon={'check'} onPressFunction={this.addStoreSubmit} /*"title" is "null" because icon only is needed*//>
                                <CustomButton title={null} icon={'chevron-left'} onPressFunction={this.toggleAddStoreOverlay} /*"title" is "null" because icon only is needed*//>
                            </View>

                        </Overlay>
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