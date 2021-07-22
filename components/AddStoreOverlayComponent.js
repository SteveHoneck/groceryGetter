import React from 'react';
import { Overlay } from 'react-native-elements';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import CustomButton from './CustomButtonComponent';
import StoreList from './StoreListComponent';


const AddStoreOverlay = (props) => {

    return(
        <Overlay 
        isVisible={props.isVisible}
        onBackdropPress={props.toggleAddStoreOverlay} //Function activated when space outside the overlay is touched
        animationType={'fade'} //Built in (from React Modal component), there are a few options
        transparent={true} //Makes the overlay backdrop transparent
        onRequestClose={() => props.toggleAddStoreOverlay()} //Funciton that will be run when hardware back button is pressed
        overlayStyle={styles.overlay} //Style of the actual overlay
        >
            <View>
                <TextInput
                    placeholder={props.placeholder}//Text to show when nothing in entered in the text field
                    onChangeText={props.onChangeText}//Operates in same manner as "addItem"
                    value={props.value}//Operates in same manner as "addItem"
                />
            </View>

            <View>
                <CustomButton title={null} icon={'check'} onPressFunction={props.addStoreSubmit} /*"title" is "null" because icon only is needed*//>
            </View>

            <View>
                <Text>Current Stores (select to remove)</Text>
                <StoreList storesArray={props.storesArray} storeSelect={props.storeSelect} /*Pass the "storesArray" and "storeSelect" function to the <StoreList> component which will pass each object in the "storesArray" and the "storeSelect" function to the <StoreItem> component*//>     
                <CustomButton title={null} icon={'minus'} onPressFunction={props.removeStore} /*"title" is "null" because icon only is needed*//>
            </View>

            <View style={{marginTop: 50}}>
                <CustomButton title={null} icon={'chevron-left'} onPressFunction={props.toggleAddStoreOverlay} /*"title" is "null" because icon only is needed*//>
            </View>
        </Overlay>
    )
}


const styles = StyleSheet.create({
    overlay: {

    }
});


export default AddStoreOverlay;