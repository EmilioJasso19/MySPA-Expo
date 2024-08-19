import Icon from "react-native-vector-icons/FontAwesome";
import {Image, Pressable, StyleSheet, View} from "react-native";
import React from "react";
import logoSpa from '../assets/logo_MySPA.png';
import userPhoto from '../assets/user_photo.jpg'

export default function Header() {
    return (
        <View style={styles.header}>
            <Pressable onPress={() => alert('modalHamburguesa')}>
                <Icon name="bars" style={styles.icon}/>
            </Pressable>
            <Image source={logoSpa} style={styles.logo}/>
            <Pressable onPress={() => alert('modalPerfil')} >
                <Image source={userPhoto} style={styles.user}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
        marginTop: 10
    },
    logo: {
        backgroundColor: '#FDCCC5',
        borderRadius: 25,
        width: 50,
        height: 50
    },
    user: {
        borderRadius: 25,
        width: 50,
        height: 50
    },
    icon: {
        color: '#18181860',
        fontSize: 28
    },
});
