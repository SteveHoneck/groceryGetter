import React from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList } from 'react-native';

function StoreList ( {storesArray} ) { //"StoreList" component receives the "storesArray" as a component of props (props destructured to "storesArray") from "MainComponent"'s state
    
    const renderItem = ( {item} ) => { //Receives a "storesArray" object from <FlatList> as argument "item" 
        return(
            <Text>{item.storeName}</Text>
        );
    }

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