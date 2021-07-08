import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomButton from './CustomButtonComponent';


const Footer = ({deleteCheckedItems, toggleModal}) => { //Pass "deleteCheckedItems" function (renamed as "onPressFunction" so that both "deletCheckedItems" and "addItemModal" functions can be passed to the "CustomButtonComponent" under same prop name) from "MainComponent" to "FooterComponent" to "CustomButtonComponent"
    return (
        <View style={styles.buttonRow}>
            <CustomButton title={'Add Item'} icon={'plus'} onPressFunction={toggleModal} />
            <CustomButton title={'Remove Checked'} icon={'minus'} onPressFunction={deleteCheckedItems}/>
        </View>
    )
} 

const styles = StyleSheet.create({
    buttonRow: {
      flexDirection: 'row', //Makes buttons into a row instead of stacking
      justifyContent: 'center', //Centers buttons
    }
  });

export default Footer;