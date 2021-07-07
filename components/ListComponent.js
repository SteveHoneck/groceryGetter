import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ListItem from './ListItemComponent';

function List( {itemArray, checkBoxToggle} ) { //receives array of items "itemArray" & function "checkBoxToggle" as props from main, passes each item in the array to "ListItemComponent". These are destructured from "props" so that "checkBoxToggle" does not have to get pulled out of the "props" via an extra line of code "const checkBoxToggle = props.checkBoxToggle;" so it can be passed to "ListItem". "checkBoxToggle" can't be passed through the "map" method because that method only takes in items from the "itemArray", objects in that array do not contain the "checkBoxToggle" function.
    list = itemArray.map ( itemObject => { //map function creates a new array called "list" by taking each object from the "itemArray" (which was passed as props from "MainComponent"), renames it "itemObject" and runs the inner "return" function on that item. The result is an array of <ListItem>s. Add filter and chain to map to group by store
        return (//The map function renders a <ListItem> for each object (which is being called "itemObject") in the "itemArray" and passes values from that object to <ListItem> as props ("key", "itemObject", "checkBoxToggle" are packaged into an object called "props" and passed)
            <ListItem key={itemObject.id} itemObject={itemObject} checkBoxToggle={checkBoxToggle} /> 
        )
    })

    return list; //New array of <ListItems> created by "map" function is returned by the "List" function
}

export default List;
