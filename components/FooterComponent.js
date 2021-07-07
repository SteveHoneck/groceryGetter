import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import FooterButton from './FooterButtonComponent';


const Footer = ({deleteCheckedItems}) => { //Pass "deleteCheckedItems" function from "MainComponent" to "FooterComponent" to "FooterButtonComponent"
    return (
        <View style={styles.buttonRow}>
            <FooterButton title={'Add Item'} icon={'plus'} />
            <FooterButton title={'Remove Checked'} icon={'minus'} deleteCheckedItems={deleteCheckedItems}/>
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