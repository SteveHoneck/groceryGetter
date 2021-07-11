import React from 'react';
import StoreListItem from './StoreListItemComponent';

//Operates the same as "ListComponent", could be combined into a more general function.

function StoreList( {storesArray, storeSelect} ) { //receives array of stores "storesArray" & function "storeSelect" as props from main, passes each object in the array & a copy of the "storeSelect" function to "StoreListItemComponent". These are destructured from "props" so that "storeSelect" does not have to get pulled out of the "props" via an extra line of code "const storeSelect = props.storeSelect;" so it can be passed to "StoreListItem". "storeSelect" can't be passed through the "map" method because that method only takes in items from the "storesArray", objects in that array do not contain the "storeSelect" function.
    storelist = storesArray.map ( storeObject => { //map function creates a new array called "storeslist" by taking each object from the "storesArray" (which was passed as props from "MainComponent"), renames it "storesObject" and runs the inner "return" function on that item. The result is an array of <StoreListItem>s.
        return (//The map function renders a <StoreListItem> for each object (which is being called "storeObject") in the "storesArray" and passes values from that object to <StoreListItem> as props ("key", "storeObject", "storeSelect" are packaged into an object called "props" and passed)
            <StoreListItem key={storeObject.id} storeObject={storeObject} storeSelect={storeSelect} /> 
        )
    })

    return storelist; //New array of <StoreListItems> created by "map" function is returned by the "StoreList" function
}

export default StoreList;