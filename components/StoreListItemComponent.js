import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const StoreListItem = (props) => { //props will be "storeSelect" function and one object from the map function in the "StoreListComponent" which has been renamed "storeObject". DESTRUCTURE PROPS AND REFACTOR CODE BELOW????

    return(
        <TouchableOpacity style={{backgroundColor: props.storeObject.backgroundColor}} onPress={() => props.storeSelect(props.storeObject.storeName, props.storeObject.id)} /*Makes the child component go slightly transparent when touched. Style "backgroundColor" is taken from the object that was passed from the map function in "StoreListComponent", this style can be changed through the "storeSelect" function that will be run when this <StoreListItem> is touched: Runs the "storeSelect" function that is in "MainComponent" and passes it the string that is in the "storeName" value and the "id" from the object that was passed from the map function in "StoreListComponent" which tells the "storeSelect" function to update the style prpoerties of the object that matches that "id". When the style properties are updated, the entire list re-renders since the state changed, which in turn displays the new styles */> 
            <Text style={{color: props.storeObject.color}} >{props.storeObject.storeName}</Text>
        </TouchableOpacity>
    )

}


const styles = StyleSheet.create({

})


export default StoreListItem;