import React from 'react';
import { Overlay } from 'react-native-elements';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import CustomButton from './CustomButtonComponent';
import StoreList from './StoreListComponent';
import Hr from './HorizontalRuleComponent';


const AddItemOverlay = (props) => {

    return(
        <Overlay
            isVisible={props.isVisible}
            onBackdropPress={props.toggleAddItemOverlay}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => props.toggleAddItemOverlay()}
            overlayStyle={styles.overlay}
        >
            <View style={styles.textInputContainer}>
                <TextInput 
                    placeholder={props.placeholder} //Text to show when nothing in entered in the text field
                    autoFocus={true}
                    onChangeText={props.onChangeText} //When text is entered into the input field, "onChangeText" assigns that text to the variable "text", passes it to the function that sets the state value of "addInput" to that text. The input field WILL accept and display entered text WITHOUT "onChangeText"
                    value={props.value} //This is the value that will be shown and captured in the text input field. Initialized in state of "MainComonent" as an empty string so that the "placeholder" will show. Used in conjunction with "onChangeText" where "onChangeText" function sets the text input in state in "MainComponent", "value" captures the state as the value that will be submitted. 
                    textAlign={'center'}
                />
            </View>
            <View style={styles.storeContainer}>
                <Text style={styles.storeSelectText}>Select Store</Text>
                <Hr />
                <StoreList storesArray={props.storesArray} storeSelect={props.storeSelect} /*Pass the "storesArray" and "storeSelect" function (passed originally from "MainComponent") to the <StoreList> component which will pass each object in the "storesArray" and the "storeSelect" function to the <StoreListItem> component*//>     
            </View>
            <View style={styles.submitButtonContainer}>
                <CustomButton title={null} icon={'check'} onPressFunction={props.addItemSubmit} /*Pass a "title", "icon", and the "addItemSubmit" to the <CustomButton> component. "addItemSubmit" (passed originally from "MainComponent") renamed to general "onPressFunction" which is accepted by <CustomButton> so that any function can be passed to <CustomButton> without having to change <CustomButton> structure. "title" is "null" because icon only is needed*//>
            </View>
        </Overlay>
    )
}


const styles = StyleSheet.create({
    overlay: {//<Overlay> continer auto-adjusts to inner contents because "height" and "width" is not defined
        alignItems: "center",
    },
    textInputContainer: {
        alignItems: "center",
        marginTop: 10,
        marginHorizontal: 10, 
        marginBottom: 5, 
        width: 125,
    },
    storeSelectText: {
        fontWeight: 'bold'
    },
    storeContainer: {
        alignItems: "center", //Aligns list title only, list items are aligned in "StoreListComponent"
        //width: set in "StoreListComponent"
        height: 75,
        marginVertical: 5,
        marginHorizontal: 10, 
    },
    submitButtonContainer: {
        marginTop: 5, 
        marginHorizontal: 10, 
        marginBottom: 10 
    },    
});


export default AddItemOverlay;
