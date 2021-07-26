import React from 'react';
import { Overlay } from 'react-native-elements';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import CustomButton from './CustomButtonComponent';
import StoreList from './StoreListComponent';
import { ScrollView } from 'react-native';
import Hr from './HorizontalRuleComponent';


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
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder={props.placeholder}//Text to show when nothing in entered in the text field
                    autoFocus={true}
                    onChangeText={props.onChangeText}//Operates in same manner as "addItem"
                    value={props.value}//Operates in same manner as "addItem"
                    textAlign={'center'}
                />
            </View>
            <View style={styles.submitButtonContainer}>
                <CustomButton title={null} icon={'check'} onPressFunction={props.addStoreSubmit} /*"title" is "null" because icon only is needed*//>
            </View>

            <View style={styles.storeContainer}>
                <Text style={styles.storeSelectText}>Select to remove</Text> 
                <Hr />
                <StoreList storesArray={props.storesArray} storeSelect={props.storeSelect} /*Pass the "storesArray" and "storeSelect" function to the <StoreList> component which will pass each object in the "storesArray" and the "storeSelect" function to the <StoreItem> component*//>     
            </View>
            <View style={styles.removeButtonContainer}>
                <CustomButton title={null} icon={'minus'} onPressFunction={props.removeStore} /*"title" is "null" because icon only is needed*//>
            </View>
        </Overlay>
    )
}


const styles = StyleSheet.create({
    overlay: { //<Overlay> continer auto-adjusts to inner contents because "height" and "width" is not defined
        alignItems: "center",
    },
    textInputContainer: {
        margin: 15, //Sets all margins to 15px
        marginBottom: 5, //Overrides bottom margin to 5px
        width: 125,
    },
    submitButtonContainer: {
        margin: 15, //Sets all margins to 15px
        marginTop: 5, //Overrides top margin to 5px
        marginBottom: 35 //Overrides bottom margin to 35px
    },
    storeContainer: {
        alignItems: "center",
        width: 125,
        height: 75,
        margin: 15, //Sets all margins to 15px
        marginBottom: 5, //Overrides bottom margin to 5px
        marginTop: 5 //Overrides top margin to 5px
    },
    storeSelectText: {
        fontWeight: 'bold'
    },
    removeButtonContainer: {
        margin: 15, //Sets all margins to 15px
        marginTop: 5, //Overrides top margin to 5px
    },

});


export default AddStoreOverlay;