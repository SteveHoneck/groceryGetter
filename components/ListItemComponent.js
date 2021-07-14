//Renders 1 list item based on "sectionListArray" passed from "ListComponent"

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements'

const ListItem = (props) => { //props will be "checkBoxToggle" function and one object named "item" from the map function in the "ListComponent" which has been renamed "item". Called as many times as there are item objects in the "data" propery of each "sectionListArray" object from <SectionList> in "ListComponent". DESTRUCTURE PROPS AND REFACTOR CODE BELOW????
    if (props.item === 'No items') { //This loop will be entered if the "itemArray.filter" method (in "ListComponent") returns nothing (in which case an object is created with the text 'No items'), meaning there were no items that had the "storeName" being iterated over. The <Text> returned will be rendered in the <SectionList> from "ListComponent" as the list item under the "storeName" that had no items.
        return(
            <Text>No items for this store...</Text>
        )
    } else { //Element to be returned if the "itemArray.filter" method (in "ListComponent") returns multiple
        return(
            <View>
                <CheckBox 
                    containerStyle={styles.checkBoxRow}
                    title={props.item.item} //Use the "item" value from the "item" passed from the <SectionList>'s "renderItem" method as the title for the checkbox
                    checked={props.item.isChecked} //Use the "isChecked" value from the "item" passed from the <SectionList>'s "renderItem" method as the true or false for <CheckBox>'s checked value
                    onPress={() => props.checkBoxToggle(props.item.id)} //run the "checkBoxToggle" function that was passed from the "ListComponent" <ListItem> call and give the function the value "id" from the "item" passed from the <SectionList>'s "renderItem" as an argument 
                />
            </View>
        )
    }

}


const styles = StyleSheet.create({
    checkBoxRow: { //Make list of checkboxes more tightly packed
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 2.5,
        marginBottom: 2.5
    }
})


export default ListItem;