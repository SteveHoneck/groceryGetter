import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const StoreListItem = (props) => { //props will be "storeSelect" function and one object from the map function in the "StoreListComponent" which has been renamed "storeObject". DESTRUCTURE PROPS AND REFACTOR CODE BELOW????

    return(
        <TouchableOpacity style={{backgroundColor: props.storeObject.backgroundColor}} onPress={() => props.storeSelect(props.storeObject.storeName, props.storeObject.storeDisplayName, props.storeObject.id)} /*ADDED 'props.storeObject.id', EXPLANATION COMMENT Makes the child component go slightly transparent when touched. Style "backgroundColor" is taken from the object that was passed from the map function in "StoreListComponent", this style can be changed through the "storeSelect" function that will be run when this <StoreListItem> is touched: Runs the "storeSelect" function that is in "MainComponent" and passes it the string that is in the "storeName" value from the object that was passed from the map function in "StoreListComponent" which tells the "storeSelect" function to update the style properties of the object that matches that "storeName" ("storeName" is also used in "addStoreSubmit" function). When the style properties are updated, the entire list re-renders since the state changed, which in turn displays the new styles. The "storeDisplayName" is passed to the "storeSelect" function which sets the "selectedStoreDisplayName" state which is then used for the toast in the "removeStore" function*/> 
            <Text style={[{color: props.storeObject.color}, styles.text]} >{props.storeObject.storeDisplayName}</Text>
        </TouchableOpacity>
    )

}


const styles = StyleSheet.create({
    text: {
        textAlign: 'center' //Causes the text to be centered within its 'stretched' container. "StoreListComponent" property "contentContainerStyle" is set to "stretched" which causes the 'box' that the text is in to take up the width of the entire 'container'.
    }
})


export default StoreListItem;