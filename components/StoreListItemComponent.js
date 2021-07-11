import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const StoreListItem = (props) => { //props will be "checkBoxToggle" function and one object from the map function in the "ListComponent" which has been renamed "itemObject". DESTRUCTURE PROPS AND REFACTOR CODE BELOW????

    return(
        <TouchableOpacity onPress={() => props.storeSelect(props.storeObject.storeName)} > 
            <Text>{props.storeObject.storeName}</Text>
        </TouchableOpacity>
    )

}


const styles = StyleSheet.create({

})


export default StoreListItem;