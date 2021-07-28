import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomButton from './CustomButtonComponent';


const Footer = ({deleteCheckedItems, toggleAddItemOverlay}) => { //Pass "deleteCheckedItems" function (renamed as "onPressFunction" so that both "deleteCheckedItems" and "toggleAddItemOverlay" functions can be passed to the "CustomButtonComponent" under same prop name) from "MainComponent" to "FooterComponent" to "CustomButtonComponent"
    return (
        <View style={styles.buttonRow}>
            <View style={styles.buttonContainer}>
              <CustomButton title={'Add Item'} icon={'plus'} onPressFunction={toggleAddItemOverlay} marginLeft={20} />
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton title={'Remove Items'} icon={'minus'} onPressFunction={deleteCheckedItems} marginLeft={20}/>
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    buttonRow: {
      flexDirection: 'row', //Makes buttons into a row instead of stacking
      justifyContent: 'center', //Centers buttons
    },
    buttonContainer: {
      margin: 10
    }
  });

export default Footer;