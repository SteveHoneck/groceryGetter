import React from 'react';
import { Text, View, StyleSheet, ToastAndroid } from 'react-native';

const Header = ({ toggleOverlay }) => {
    
    const loginToast = () => { //Remove when login functionality is added
        ToastAndroid.showWithGravityAndOffset(
            "Login not available at this time.",
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            100 //Y-offset of Toast, set to be close to typing area so User notices it
        );
    }

    return (
        <View style={styles.wrapper}>
            <View style={{flex: 1}}>
                <Text style={[styles.text, styles.logoText]}>GroceryGetter</Text>
            </View>
            <View style={[{flex: 1 }, styles.rightBox]}>
                <Text style={styles.text} onPress={loginToast}>Login</Text>
                <Text style={styles.text} onPress={() => toggleOverlay('addStoreOverlayVisible')/*Call the 'toggleOverlay' function and pass it the string 'addStoreOverlayVisible' which will be interperted by the function as the state key/value pair to be toggled*/}>Add/Remove Store</Text>
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
    logoText: {
        fontSize: 24,
        fontStyle: 'italic',
    },
    text: {
        color: "white",
        fontSize: 16,
        marginHorizontal: 10, marginVertical: 2.5
    }


});

export default Header;