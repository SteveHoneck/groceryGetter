//Renders 1 list item based on "sectionListArray" passed from "ListComponent"

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements'

const ListItem = ({ item, checkBoxToggle }) => { //props will be "checkBoxToggle" function and one object named "item" from the map function in the "ListComponent" which has been renamed "item". Called as many times as there are item objects in the "data" propery of each "sectionListArray" object from <SectionList> in "ListComponent". DESTRUCTURE PROPS AND REFACTOR CODE BELOW????
    return (
        <View>
            <CheckBox 
                containerStyle={styles.checkBoxRow}
                title={item.item} //Use the "item" value from the "item" passed from the <SectionList>'s "renderItem" method as the title for the checkbox
                checked={item.isChecked} //Use the "isChecked" value from the "item" passed from the <SectionList>'s "renderItem" method as the true or false for <CheckBox>'s checked value
                onPress={() => checkBoxToggle(item.id)} //run the "checkBoxToggle" function that was passed from the "ListComponent" <ListItem> call and give the function the value "id" from the "item" passed from the <SectionList>'s "renderItem" as an argument 
                textStyle={item.textStyle} //Use the "textStyle" value (which is a "styles" object) passed from the <SectionList>'s "renderItem" method as the styles to be applied to the "title" 
            />
        </View>
    )
}


const styles = StyleSheet.create({
    checkBoxRow: { //Make list of checkboxes more tightly packed & have larger Left and Right margins
        paddingVertical: 5,
        marginVertical: 2.5,
        marginLeft: 20, //Left and Right can't be combined to "marginHorizontal" and have proper effect
        marginRight: 20,
    }
})


export default ListItem;