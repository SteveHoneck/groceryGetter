import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ListItem from './ListItemComponent';

function List(props) { //receives "itemArray" & "checkBoxToggle" as props from main, passes each item in the array to "ListItemComponent"
    list = props.itemArray.map ( item => { //map function, add filter and chain to map to group by store
        return (
            <ListItem item={item}
            
            />
        )
    })

    return list;
}

export default List;
