import React from 'react';
import { Text, View, StyleSheet, SectionList } from 'react-native';
import ListItem from './ListItemComponent';
import * as Animatable from 'react-native-animatable';

function List( {itemArray, storesArray, checkBoxToggle} ) { //receives array of items "itemArray", array of stores "storesArray" & function "checkBoxToggle" as props from main. "for" loop combines the "itemArray" and "storesArray" into an array called "sectionListArray" that can be used by <SectionList>. "checkBoxToggle" is passed directly to "ListItemComponent". 
    let sectionListArray = [] //Initalize an empty array to be used by <SectionList>
    let sectionListObject = []

    for(let i = 0; i < storesArray.length; i++) { //"for" loop iterates over the "storesArray" picking out each store name
        let storeName = storesArray[i].storeName; //"storeName" will be the "storeName" of the current iteration object from "storesArray"
    
        let data = itemArray.filter(itemObject => itemObject.storeName === storeName) //Creates an array called "data" that is an array of objects from the "itemArray" matching the current store name
    
        if (data.length === 0) { //if the array "data" has nothing in it, that means that there were no items in the "itemArray" with the "storeName" being iterated over. In this case, return an object with the "storeName" being iterated over & the string 'No Items' in the "data" array. This will cause the "storeName" to be rendered as a section header in the <SectionList> and a message (written out in "ListItemComponent") to be displayed as the "ListItem"
            sectionListObject = { //Create an object that is in the format that can be used by <FlatList>, a string "title" to be rendered as the list section header and "data" that is an array of objects to be rendered as the list items
                title: storeName,
                data: ['No items']
            } 
        } else { //If the "itemArray.filter" method found items with the "storeName" being iterated over, put all those item objects in the "data" value for the "sectionListObject"
            sectionListObject = { //Create an object that is in the format that can be used by <FlatList>, a string "title" to be rendered as the list section header and "data" that is an array of objects to be rendered as the list items
                title: storeName,
                data: data
            }
        }

        sectionListArray.push(sectionListObject); //Add the "sectionListObject" to the "sectionListArray"
    }
    
    return(
      <Animatable.View animation='slideInLeft' duration={1500} /*Causes entire <SectionList> to slide into view when rendered (which is on application initial load only)*/>
        <SectionList
          sections={sectionListArray}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <ListItem item={item} checkBoxToggle={checkBoxToggle}/>} //"renderItem" takes the "data" property from the current iteration object in "sections" ("sectionListArray"), names it "item" and passes it to <ListItem> component
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text> 
          )}
          stickySectionHeadersEnabled={true}
          ListEmptyComponent={<Text>Add a store to get started!</Text>} //Only shows up when there are no items OR stores in list
        />
      </Animatable.View>
    )
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: 'white',
    }
  });

export default List;
