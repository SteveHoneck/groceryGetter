import React from 'react';
import { Text, View } from 'react-native';
import Button from './ButtonComponent';


const Footer = () => {
    return (
        <View>
            <Text>Footer</Text>
            <Button title={'Add'} />
            <Button title={'Remove'} />
        </View>
    )
} 

export default Footer;