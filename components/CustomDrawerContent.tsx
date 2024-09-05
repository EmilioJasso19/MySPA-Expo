import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';
import logoSpa from '../assets/logo_MySPA.png';
import userPhoto from '../assets/user_photo.jpg'

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Image source={logoSpa} style={styles.logo} />
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 0
    },
    logo: {
        height: 100,
        width: 100,
        backgroundColor: "#FDCCC5",
        borderRadius: 100,
        margin: 20
    },
});

export default CustomDrawerContent;