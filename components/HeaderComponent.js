import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Header = ({ toggleAddStoreOverlay }) => {
    return (
        <View style={styles.wrapper}>
            <View style={{flex: 1}}>
                <Text style={styles.text}>GroceryGetter</Text>
            </View>
            <View style={[{flex: 1 }, styles.rightBox]}>
                <Text style={styles.text}>Login</Text>
                <Text style={styles.text} onPress={toggleAddStoreOverlay}>Add/Remove Store</Text>
            </View>
        </View>
    )
} 


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightBox: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    text: {
        color: "white",
        fontSize: 16
    }


});

export default Header;