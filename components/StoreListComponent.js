import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import StoreListItem from './StoreListItemComponent';

function StoreList( {storesArray, storeSelect} ) { //receives array of items "itemArray" & function "checkBoxToggle" as props from main, passes each item in the array to "ListItemComponent". These are destructured from "props" so that "checkBoxToggle" does not have to get pulled out of the "props" via an extra line of code "const checkBoxToggle = props.checkBoxToggle;" so it can be passed to "ListItem". "checkBoxToggle" can't be passed through the "map" method because that method only takes in items from the "itemArray", objects in that array do not contain the "checkBoxToggle" function.
    storelist = storesArray.map ( storeObject => { //map function creates a new array called "list" by taking each object from the "itemArray" (which was passed as props from "MainComponent"), renames it "itemObject" and runs the inner "return" function on that item. The result is an array of <ListItem>s. Add filter and chain to map to group by store
        return (//The map function renders a <ListItem> for each object (which is being called "itemObject") in the "itemArray" and passes values from that object to <ListItem> as props ("key", "itemObject", "checkBoxToggle" are packaged into an object called "props" and passed)
            <StoreListItem key={storeObject.id} storeObject={storeObject} storeSelect={storeSelect} /> 
        )
    })

    return storelist; //New array of <ListItems> created by "map" function is returned by the "List" function
}

export default StoreList;

/*
function StoreList ( {storesArray, storeSelect} ) { //"StoreList" component receives the "storesArray" and "storeSelectToggle" function as a component of props (props destructured to "storesArray" and "storeSelectToggle") from "MainComponent"'s state
    const renderItem = ( {item} ) => { //Receives a "storesArray" object from <FlatList> as argument "item" 
        return(
            <TouchableOpacity onPress={() => storeSelect(item.storeName)} /*Causes child element to become more transparent when touched> 
                <Text>{item.storeName}</Text>
            </TouchableOpacity>
        );
    }
//Pass a toggle function
//togle function takes storesArray, changes isSelected property of ID of item clicked
//toggle function is passed the id of the store
    return(
        <FlatList
            data={storesArray} //<FlatList> passes each object in "storesArray" to "renderItem"
            renderItem={renderItem} //Function called on each object in the "storesArray". The object is passed to the "renderItem" function as an argument called "item"
            keyExtractor={(item) => item.id} //<FlatList> passes each object in "storesArray" to "keyExtractor" which renames the object to "item" and assigns the "keyExtractor" value to the "id" value of the "item" object
            //extraData={selectedId}
            ListHeaderComponent={<Text>Select Store</Text>}
        />     
    );
}

export default StoreList;
*/