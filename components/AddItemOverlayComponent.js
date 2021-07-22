import React from 'react';
import { Overlay } from 'react-native-elements';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import CustomButton from './CustomButtonComponent';
import StoreList from './StoreListComponent';


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
            <View>
                <TextInput 
                    placeholder={props.placeholder} //Text to show when nothing in entered in the text field
                    onChangeText={props.onChangeText} //When text is entered into the input field, "onChangeText" assigns that text to the variable "text", passes it to the function that sets the state value of "addInput" to that text. The input field WILL accept and display entered text WITHOUT "onChangeText"
                    value={props.value} //This is the value that will be shown and captured in the text input field. Initialized in state of "MainComonent" as an empty string so that the "placeholder" will show. Used in conjunction with "onChangeText" where "onChangeText" function sets the text input in state in "MainComponent", "value" captures the state as the value that will be submitted. 
                />
            </View>
            <View>
                <Text>Select Store</Text>
                <StoreList storesArray={props.storesArray} storeSelect={props.storeSelect} /*Pass the "storesArray" and "storeSelect" function (passed originally from "MainComponent") to the <StoreList> component which will pass each object in the "storesArray" and the "storeSelect" function to the <StoreItem> component*//>     
            </View>
            <View>
                <CustomButton title={null} icon={'check'} onPressFunction={props.addItemSubmit} /*Pass a "title", "icon", and the "addItemSubmit" to the <CustomButton> component. "addItemSubmit" (passed originally from "MainComponent") renamed to general "onPressFunction" which is accepted by <CustomButton> so that any function can be passed to <CustomButton> without having to change <CustomButton> structure. "title" is "null" because icon only is needed*//>
                <CustomButton title={null} icon={'chevron-left'} onPressFunction={props.toggleAddItemOverlay} /*"title" is "null" because icon only is needed*//>
            </View>
        </Overlay>
    )
}


const styles = StyleSheet.create({
    overlay: {

    }
});


export default AddItemOverlay;
