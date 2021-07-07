import React, { Component } from 'react';
import List from './ListComponent';
import { DATA } from '../shared/data';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


//Container component that will be parent to presentational components. Holds "itemArray" and functions that operate on the array and passes them to the various components

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemArray: DATA //Replace with empty array when implement "addItem" modal
            //Add state for input from "addItem" modal
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
        this.setState({updatedItemArray}); //replace the current "itemArray" in state with the "updatedItemArray"
    }

    //Function "deleteCheckedItems"  to delete all checked items (make arrow function so don't have to bind. Must be in "MainComponent" because the function operates on the state in "MainComponent"
    deleteCheckedItems = () => { 
        alert('button pressed')
    }

    //Function "addItemSubmit" to submit info from "addItem" modal  (make arrow function so don't have to bind    addItemSubmit () => {...}   )

    //Function "addStoreSubmit" to submit info from "addStore" modal  (make arrow function so don't have to bind    addStoreSubmit () => {...}   )

    render() {
        return ( // <List> is passed the array of items "itemArray", and the function to toggle the checkbox "checkBoxToggle" to the "List" component. <Footer> is passed the "deleteCheckedItems" function. 
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.wrapper}>
                    <View style={styles.header}> 
                        <Header />
                    </View>
                    <ScrollView>
                        <List itemArray={this.state.itemArray} checkBoxToggle={this.checkBoxToggle} /> 
                    </ScrollView>
                    <View style={styles.footer}>
                        <Footer deleteCheckedItems={this.deleteCheckedItems} />
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
      //position: 'absolute', 
      bottom: 0
    }
  });


export default Main;