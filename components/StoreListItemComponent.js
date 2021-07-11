import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const StoreListItem = (props) => { //props will be "storeSelect" function and one object from the map function in the "StoreListComponent" which has been renamed "storeObject". DESTRUCTURE PROPS AND REFACTOR CODE BELOW????

    return(
        <TouchableOpacity onPress={() => props.storeSelect(props.storeObject.storeName)} /*Makes the child component go slightly transparent when touched. runs the "storeSelect" function that is in "MainComponent" and passes it the string that is in the "storeName" value from the object that was passed from the map function in "StoreListComponent"*/> 
            <Text>{props.storeObject.storeName}</Text>
        </TouchableOpacity>
    )

}


const styles = StyleSheet.create({

})


export default StoreListItem;