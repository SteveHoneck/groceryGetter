import React from 'react';
import { Text, View, StyleSheet, SectionList } from 'react-native';
import ListItem from './ListItemComponent';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

function List( {itemArray, storesArray, checkBoxToggle} ) { //receives array of items "itemArray", array of stores "storesArray" & function "checkBoxToggle" as props from main. "for" loop combines the "itemArray" and "storesArray" into an array called "sectionListArray" that can be used by <SectionList>. "checkBoxToggle" is passed directly to "ListItemComponent". 
    
    //Start <SectionList> array build. Builds an array to be used by <SectionList> (Should this be in a function?)
    let sectionListArray = [] //Initalize an empty array to be used by <SectionList>
    let sectionListObject = []

    for(let i = 0; i < storesArray.length; i++) { //"for" loop iterates over the "storesArray" picking out each store name
        let title = storesArray[i].storeDisplayName; //"title" will be the "storeDisplayName" of the current iteration object from "storesArray"
    
        let data = itemArray.filter(itemObject => itemObject.storeName === storesArray[i].storeName) //Creates an array called "data" that is an array of objects from the "itemArray" whos normalized "storeName" value matches the normalized "storeName" value of the current iteration object from "storesArray".

            sectionListObject = { //Create an object that is in the format that can be used by <FlatList>, a string "title" to be rendered as the list section header and "data" that is an array of objects to be rendered as the list items
                title, //ES6 syntax - since the key and value are the same, 'title: title' can be written as just 'title'
                data //ES6 syntax - since the key and value are the same, 'data: data' can be written as just 'data'
            }
        
        sectionListArray.push(sectionListObject); //Add the "sectionListObject" to the "sectionListArray"
    }
    //End <SectionList> array build

    noItemMessage = ({section}) => { //This function is called as the footer to each section (which is the store name). Takes the entire object ('title' as a string and 'data' as an array of object) currently being iterated over by <SectionList>, names it 'section' and passes it into this function. 
      if(section.data.length == 0){ //if the 'data' array is empty, there are no items for the store, so return a message of <Text>.
        return  (
          <Animatable.View animation='slideInLeft' duration={1500}>
            <Text style={styles.storeEmptyText}>No items for this store...</Text>
          </Animatable.View>
        )
      }
      return null //If the 'data' array is not empty (there are items for the store), then don't render the "renderSectionFooter" at all
   }
    
    return(
        <SectionList
          sections={sectionListArray}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => 
            <Animatable.View animation='slideInLeft' duration={1500} /*Causes entire <SectionList> to slide into view when rendered (which is on application initial load only)*/>
              <ListItem item={item} checkBoxToggle={checkBoxToggle} /*"renderItem" takes the "data" property from the current iteration object in "sections" ("sectionListArray"), names it "item" and passes it to <ListItem> component*/ /> 
            </Animatable.View>}
          renderSectionHeader={({ section: { title } }) => (
            <Animatable.View animation='slideInLeft' duration={1500}>
              <LinearGradient
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 0}} //Set 'start' 'x: 0' and 'end' 'x: 1' to make gradient horizontal
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']} //Colors all white with varying opacity. 
                locations={[0.0, 0.035, .4, 1]} //Stop locations of the corresponding colors in 'colors' array
                style={styles.linearGradient}
              >
                <Text style={styles.sectionHeader}>{title}</Text> 
              </LinearGradient>
            </Animatable.View>  
            )}
          stickySectionHeadersEnabled={true}
          ListEmptyComponent={<Text style={styles.listEmptyText}>Add a store to get started!</Text>} //Only shows up when there are no items AND stores in list
          renderSectionFooter={section => noItemMessage(section)} //Will show up if there is a Store with no items. Making this an arrow function as opposed to a direct function call (i.e. 'this.noItemMessage') allows the animation to happen every time the message displays.
          persistentScrollbar={true}//Makes the vertical scroll bar always visible so that user knows if there are more items on list than are currently visible
        />
    )
}

const styles = StyleSheet.create({
    sectionHeader: {
      //backgroundColor: 'white',
      fontSize: 20,
      marginLeft: 10,
      paddingVertical: 5
    },
    linearGradient: {
      flex: 1,
    },
    listEmptyText: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: '50%', //Moves the text down. Not sure what the 50% is measured from and as a result, text does not appear in the exact middle of the screen. To make text in the middle, add style "justifyContent: 'center'" to the parent <View> of <List> in main component (however doing that also centers the list of stores and items which is not desired, want those to always start at the top) (could pass that style property back to "MainComponent" on condition that "ListEmptyComponent" is displayed) 
      color: 'black',
    },
    storeEmptyText: {
      fontSize: 16,
      marginLeft: 20,
      color: 'gray',
  }
  });

export default List;
