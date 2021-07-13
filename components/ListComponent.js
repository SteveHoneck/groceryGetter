import React from 'react';
import { Text, View, StyleSheet, SectionList } from 'react-native';
import ListItem from './ListItemComponent';

function List( {itemArray, storesArray, checkBoxToggle} ) { //receives array of items "itemArray", array of stores "storesArray" & function "checkBoxToggle" as props from main. "for" loop combines the "itemArray" and "storesArray" into an array called "sectionListArray" that can be used by <SectionList>. "checkBoxToggle" is passed directly to "ListItemComponent". 
    let sectionListArray = [] //Initalize an empty array to be used by <SectionList>

    for(let i = 0; i < storesArray.length; i++) { //"for" loop iterates over each 
        let storeName = storesArray[i].storeName; //"storeName" will be the "storeName" of the current iteration object from "storesArray"
    
        let data = itemArray.filter(itemObject => itemObject.storeName === storeName) //Creates an array called "data" that is an array of objects from the "itemArray" matching the current store name
    
        let sectionListObject = { //Create an object that is in the format that can be used by <FlatList>, a string "title" to be rendered as the list section header and "data" that is an array of objects to be rendered as the list items
            title: storeName,
            data: data
        }
    
        sectionListArray.push(sectionListObject); //Add the "sectionListObject" to the "sectionListArray"
    }
    
    return(
    <SectionList
          sections={sectionListArray}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <ListItem item={item} checkBoxToggle={checkBoxToggle}/>} //"renderItem" takes the "data" property from the current iteration object in "sections" ("sectionListArray"), names it "item" and passes it to <ListItem> component
          renderSectionHeader={({ section: { title } }) => (
            <Text>{title}</Text> 
          )}
          stickySectionHeadersEnabled={true}
          ListEmptyComponent={<Text>Add some items!</Text>} //Only shows up when there are no items OR stores in list
        />
    )
}

export default List;
