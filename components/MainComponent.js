import React, { Component } from 'react';
import { DATA } from '../shared/data';
import { STORES } from '../shared/stores';
import List from './ListComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import CustomButton from './CustomButtonComponent';
import StoreList from './StoreListComponent';
import { View, ScrollView, StyleSheet, Modal, Text, TextInput, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';


//Container component that will be parent to presentational components. Holds "itemArray" and functions that operate on the array and passes them to the various components

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemArray: [], //Initial item array
            storesArray: STORES,//Replace with empty array when implement "addStores"            
            modalVisible: false,
            addItemInput: '',//Add state for input from "addItem" modal
            textInputPlaceholder: 'Enter item', //State for resetting the "placeholder" value when "addItem" <Modal> is activated (could be a constant below instead of state?)
            selectedStore: null //State for holding the text string of store selected in "addItemModal"
            //Add state for input from "addStore" modal
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

    storeSelect = (storeName) => {
        this.setState({selectedStore: storeName});
    }

    //Function "deleteCheckedItems"  to delete all checked items (make arrow function so don't have to bind. Must be in "MainComponent" because the function operates on the state in "MainComponent"
    deleteCheckedItems = () => { 
        const updatedItemArray = this.state.itemArray.filter( obj => obj.isChecked === false ); //Make a copy of the "itemArray" in state, rename it "updatedItemArray", filters the"updateItemArray" (which at this point is what is currently in state) for all objects that have "isChecked" property as "false". This returns an array of objects that do not have their check boxes marked.
        this.setState({itemArray: updatedItemArray}); //replace the current "itemArray" in state with the "updatedItemArray" i.e. an array of all items that are unchecked
    }

    //Function to change the current state of the modal's visibility
    toggleModal = () => {
        this.setState({modalVisible: !this.state.modalVisible});
        this.setState({textInputPlaceholder: 'Enter item', addItemInput: ''}) //Resets the <Input> text field in the "addItem" <Modal>
    }

    //Function "addItemSubmit" to submit info from "addItem" modal  (make arrow function so don't have to bind)
    addItemSubmit = () => {
        if (this.state.addItemInput) { //If the user has not entered any text, "addItemInput" will be an empty string which is FALSY and the "if" statement will not be entered (a blank item will not be added)
            this.state.itemArray.push({
                id: Date.now(), //Assign an always unique "id" which will be current milliseconds since UNIX epoch. 
                storeName: this.state.selectedStore, //
                item: this.state.addItemInput, //Could submit "value" from text <Input> field since it is also defined as the sate of "addItemInput", not sure which method is better. 
                isChecked: false
            })
            ToastAndroid.showWithGravity( //Notify user that item was added successfully
                `${this.state.addItemInput} added!`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            this.setState({textInputPlaceholder: 'Enter item', addItemInput: ''}) //Resets the <Input> text field in the "addItem" <Modal>
        } else {
            ToastAndroid.showWithGravity( //Notify user that item was not added
                'Please add an item!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    } 

    //Function "addStoreSubmit" to submit info from "addStore" modal  (make arrow function so don't have to bind    addStoreSubmit () => {...}   )

    render() {
        return ( // <List> is passed the array of items "itemArray", and the function to toggle the checkbox "checkBoxToggle" to the "List" component. <Footer> is passed the "deleteCheckedItems" function. 
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.wrapper}>
                    
                    <View style={styles.header}> 
                        <Header />
                    </View>
                    
                    <ScrollView /*!!!!GETS STUCK BEHIND FOOTER, NEED TO FIX!!!!*/>
                        <List itemArray={this.state.itemArray} checkBoxToggle={this.checkBoxToggle} /> 
                    </ScrollView>
                    
                    <View style={styles.footer}>
                        <Footer deleteCheckedItems={this.deleteCheckedItems} toggleModal={this.toggleModal}/>
                    </View>
                    
                    <View style={{flex: 1}}> 
                        <Modal
                            animationType={'slide'} //Built in, there are a few options
                            transparent={false} //Makes the modal opaque
                            visible={this.state.modalVisible} //Visibility will be set to what is stored in the state "modalVisible"
                            onRequestClose={() => this.toggleModal()} //Funciton that will be run when hardware back button is pressed
                        >
                            <View style={{flex: .5, marginTop: '25%'}}>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <TextInput 
                                        placeholder={this.state.textInputPlaceholder} //Text to show when nothing in entered in the text field
                                        onChangeText={text => this.setState({addItemInput: text})} //When text is entered into the input field, "onChangeText" assigns that text to the variable "text", passes it to the function that sets the state value of "addItemInput" to that text. The input field WILL accept and display entered text WITHOUT "onChangeText"
                                        value={this.state.addItemInput} //This is the value that will be shown and captured in the text input field. Initialized in state as an empty string so that the "placeholder" will show. Used in conjunction with "onChangeText" where "onChangeText" function sets the text input in state, "value" captures the state as the value that will be submitted. 
                                    />
                                </View>
                                <View style={{flex: 3, alignItems: 'center'}}>
                                    <Text>Select Store</Text>
                                    <StoreList storesArray={this.state.storesArray} storeSelect={this.storeSelect} />     
                                </View>
                                <View style={{flex: 3, alignItems: 'center'}}>
                                    <CustomButton title={'Add Item'} icon={'plus'} onPressFunction={this.addItemSubmit} />
                                    <CustomButton title={'Back'} icon={'chevron-left'} onPressFunction={this.toggleModal} />
                                </View>
                            </View>
                        </Modal>
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
    }
  });



export default Main;