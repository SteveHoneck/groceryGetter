import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import StoreListItem from './StoreListItemComponent';

//Operates the same as "ListComponent", could be combined into a more general function depending on how "ListComponent" uses <SectionList>.

function StoreList( {storesArray, storeSelect} ) { //receives array of stores "storesArray" & function "storeSelect" as props from main, passes each object in the array & a copy of the "storeSelect" function to "StoreListItemComponent" through <FlatList>'s built-in functionality. 
    const renderItem = ({ item }) => ( //"renderItem" is called by the <FlatList>'s "renderItem" property
        <StoreListItem storeObject={item} storeSelect={storeSelect} /* The <FlatList>'s "renderItem" property takes an object from the "data" property, names it "item" and passes it to this function which renders a <StoreListItem> for each "item" (object in the "data" property), and passes to the <StoreListItem> the "item" renamed to "storeObject" and the "storeSelect" function as props.*/ /> 
    )

    return(
        <FlatList 
            data={storesArray} // Array from which each object is passed to "render" item
            renderItem={renderItem} // Function to be called on each object in the "data" property
            keyExtractor={item => item.id} //
            ListEmptyComponent={<Text style={styles.listEmptyText}>No stores</Text>} //Displays when there are no stores in the "storesArray"
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps={'handled'} //Allows items in <FlatList> to be selected without dismissing the keyboard 
        />
    )
}

const styles = StyleSheet.create({
    listEmptyText: {
        color: 'darkgray',
        textAlign: 'center'
    },
    contentContainer: {
        width: 125, //Sets the width of the list, without this property, the width of the list would snap to the length of the longest store
        alignItems: 'stretch', //Causes items in the list to take up entire width 
    }
})

export default StoreList;