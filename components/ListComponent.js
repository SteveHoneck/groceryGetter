import React from 'react';
import { Text, SectionList } from 'react-native';
import { ListItem } from 'react-native-elements';

function List(props) {

    const renderListItem = ({ item }) => { //An object is passed to this function from "renderItem" within <SectionList>. Destructure "item" from the object 
        return (
            <ListItem>
                <ListItem.CheckBox />
                <ListItem.Content>
                    <ListItem.Title>{item}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <SectionList 
            sections={props.data} //Where the <SectionList> is getting it's data from, it is expecting an object that contains an array named "data". <SectionList> iterates (like "map") through every index in the "data" array and runs whatever callback is in "renderItem".
            keyExtractor={(item, index) => item + index} //Sets a unique key for each item so React can track if the item has changed. Key is set as the unique combination of the current item and it's index within the "data" array
            renderItem={renderListItem} //Specifies how to render each item in the list. Default behavior of <SectionList> is to pass "renderItem" an object with a bunch of properties and passes that object to the callback function "renderItem" that is defined above. Whatever is in the current index of the "data" array is named "item" within that object.
            renderSectionHeader={({ section: { storeName } }) => (
                <Text>{storeName}</Text>
            )}
        />
    );

}

export default List;
