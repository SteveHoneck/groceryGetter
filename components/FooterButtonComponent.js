import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements'

const FooterButton = ({title, icon, onPressFunction}) => { //Receives the "title", "icon" name, and "onPressFunction" (which is either "deletCheckedItems" function or "addItemModal" function) from "FooterComponent"
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
        />
    )
} 

const styles = StyleSheet.create({
    button: {
      margin: 10,
      padding: 10,
      width: 175
    },
    icon: {
        marginLeft: 20
    }
  });


export default FooterButton;
