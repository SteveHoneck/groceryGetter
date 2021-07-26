import React from 'react';
import { View, StyleSheet } from 'react-native';


const Hr = () => {
    return <View style={styles.horizontalRule} />
} 

const styles = StyleSheet.create({
    horizontalRule: {
        width: 125, 
        borderStyle: 'solid', 
        borderBottomWidth: 1, 
        borderBottomColor: 'darkgray', 
        marginBottom: 4
    }
});

export default Hr;