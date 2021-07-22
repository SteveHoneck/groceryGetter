import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements'

const CustomButton = ({title, icon, onPressFunction}) => { //Receives the "title", "icon" name, and "onPressFunction" (which is either "deleteCheckedItems" function or "toggleAddItemOverlay" function) from "FooterComponent". Receives also from <Overlay>s.
    return (
        <Button
        icon = {
            <Icon 
                style={styles.icon}
                type='font-awesome-5'
                name={icon}
            />
        }
        iconRight
        title = {title}
        onPress = { () => onPressFunction() }
        buttonStyle = {styles.button}
        titleStyle = {styles.title}
        />
    )
} 

const styles = StyleSheet.create({
    button: {
      margin: 10,
      padding: 10,
      width: 175,
      backgroundColor: "yellowgreen",
    },
    icon: {
        marginLeft: 20
    },
    title: {
        color: "black"
    }
  });


export default CustomButton;
