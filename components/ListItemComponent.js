//Renders 1 list item based on "itemArray" passed from "MainComponent"'s "itemArray" state prop

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'

const ListItem = (props) => { //props will be one item object from the map function in the "ListComponent"

    const icon = props.item.isChecked ? 'check-square' : 'square';

    return(
        <View>
            <Icon
                type='font-awesome-5'
                name={icon}
                onPress={props.checkBoxToggle}
            />
            <Text>{props.item.item}</Text>
        </View>
    )

}


const styles = StyleSheet.create({

})


export default ListItem;