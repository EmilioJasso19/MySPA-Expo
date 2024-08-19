import React from "react";
import {Image, StatusBar, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";
import logo from '../assets/logo_MySPA.png';


export default function Sidebar() {
    const renderLinkItem = (linkText, IconComponent, iconName) => {
        return (
            <View style={styles.linkItemContainer}>
                <IconComponent name={iconName} style={styles.icon}/>
                <Text style={styles.linkText}>{linkText}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <View>
                <Icon name="times" style={styles.iconClose}/>
            </View>
            <Image source={logo} style={styles.logo}/>
            <View>
                {renderLinkItem("Reservar cita", Icon, "calendar")}
                {renderLinkItem("Tus citas", Icon, "clock")}
                {renderLinkItem("Servicios", Icon, "leaf")}
                {renderLinkItem("Productos", Icon, "gift")}
                {renderLinkItem("Personal", Icon, "user")}
                {renderLinkItem("Políticas de privacidad", FeatherIcon, "file-text")}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: 255,
        padding: 10,
        backgroundColor: '#fafafa',
        shadowColor: "purple",
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 30, // Android
    },
    iconClose: {
        fontWeight: '100',
        fontSize: 18,
        alignSelf: "flex-end"
    },
    logo: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: '#fdccc5',
        alignSelf: "center",
        margin: 10,
    },
    linkItemContainer: {
        height: 48,
        width: '100%',
        padding: 12,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    icon: {
        fontSize: 24,
        color: '#181818',
    },
    linkText: {
        fontWeight: "500",
        fontSize: 14,
        color: '#181818',
        marginLeft: 12,
    },
})