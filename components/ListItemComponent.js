//Renders 1 list item based on "itemArray" passed from "MainComponent"'s "itemArray" state prop

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements'

const ListItem = (props) => { //props will be "checkBoxToggle" function and one object from the map function in the "ListComponent" which has been renamed "itemObject". DESTRUCTURE PROPS AND REFACTOR CODE BELOW????

    return(
        <View>
            <CheckBox
                title={props.itemObject.item} //Use the "item" value from the "itemObject" passed from the "map" method as the title for the checkbox
                checked={props.itemObject.isChecked} //Use the "isChecked" value from the "itemObject" passed from the "map" method as the true or false for <CheckBox>'s checked value
                onPress={() => props.checkBoxToggle(props.itemObject.id)} //run the "checkBoxToggle" function that was passed from the "ListComponent" <ListItem> call and give the function the value from the "itemObject"'s "id" value as an argument 
            />
        </View>
    )

}


const styles = StyleSheet.create({

})


export default ListItem;