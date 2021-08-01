import React from 'react';
import { Overlay } from 'react-native-elements';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import CustomButton from './CustomButtonComponent';
import StoreList from './StoreListComponent';
import Hr from './HorizontalRuleComponent';


const AddStoreOverlay = (props) => {

    return(
        <Overlay 
        isVisible={props.isVisible}
        onBackdropPress={() => props.toggleOverlay('addStoreOverlayVisible')} //Function activated when space outside the overlay is touched. Call the 'toggleOverlay' function and pass it the string 'addStoreOverlayVisible' which will be interperted by the function as the state key/value pair to be toggled
        animationType={'fade'} //Built in (from React Modal component), there are a few options
        transparent={true} //Makes the overlay backdrop transparent
        onRequestClose={() => props.toggleOverlay('addStoreOverlayVisible')} //Function that will be run when hardware back button is pressed
        overlayStyle={styles.overlay} //Style of the actual overlay
        >
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder={props.placeholder}//Text to show when nothing is entered in the text field
                    autoFocus={true}
                    onChangeText={props.onChangeText}//Operates in same manner as "addItem"
                    value={props.value}//Operates in same manner as "addItem"
                    textAlign={'center'}
                />
            </View>
            <View style={styles.submitButtonContainer}>
                <CustomButton title={null} icon={'check'} onPressFunction={props.addStoreSubmit} marginLeft={0}/*"title" is "null" because icon only is needed*//>
            </View>

            <View style={styles.storeContainer}>
                <Text style={styles.storeSelectText}>Select to Remove</Text> 
                <Hr />
                <StoreList storesArray={props.storesArray} storeSelect={props.storeSelect} /*Pass the "storesArray" and "storeSelect" function to the <StoreList> component which will pass each object in the "storesArray" and the "storeSelect" function to the <StoreListItem> component*//>     
            </View>
            <View style={styles.removeButtonContainer}>
                <CustomButton title={null} icon={'minus'} onPressFunction={props.removeStore} marginLeft={0} /*"title" is "null" because icon only is needed*//>
            </View>
        </Overlay>
    )
}


const styles = StyleSheet.create({
    overlay: { //<Overlay> container auto-adjusts to inner contents because "height" and "width" is not defined
        alignItems: "center",
        position: "absolute", //Combination of 'position' and 'top' fixes overlay to a spot on the screen and keeps the <Overlay> from moving when the keyboard appears/disappears 
        top: 85
    },
    textInputContainer: {
        alignItems: "center",
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 5, 
        width: 125,
    },
    submitButtonContainer: {
        marginTop: 5, 
        marginHorizontal: 10, 
        marginBottom: 35
    },
    storeContainer: {
        alignItems: "center", //Aligns list title only, list items are aligned in "StoreListComponent"
        //width: set in "StoreListComponent"
        height: 75,
        marginVertical: 5, 
        marginHorizontal: 10, 
    },
    storeSelectText: {
        fontWeight: 'bold'
    },
    removeButtonContainer: {
        marginTop: 5, 
        marginHorizontal: 10, 
        marginBottom: 10
    },

});


export default AddStoreOverlay;