import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import Home from './pages/Home';
import CustomDrawerContent from './components/CustomDrawerContent';
import 'react-native-gesture-handler';
import './gesture-handler';
import BookAppointment from "./pages/BookAppointment";
import YourAppointments from "./pages/YourAppointments";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Personal from "./pages/Personal";
import PrivacyPolicies from "./pages/PrivacyPolicies";
import Profile from "./pages/Profile";

const Drawer = createDrawerNavigator();

const logoSpa = require('./assets/logo_MySPA.png');
const userPhoto = require('./assets/user_photo.jpg');

const CustomHeader = ({ navigation }) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <View style={styles.menuIcon}>
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.logo}>
            <Image source={logoSpa} style={styles.logoImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.logo}>
            <Image source={userPhoto} style={styles.userPhoto} />
        </TouchableOpacity>
    </View>
);

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                    headerStyle: styles.headerContainer,
                    drawerItemStyle: { display: 'none' }
                })}
            >
                <Drawer.Screen
                    name="Home"
                    component={Home}
                />
                <Drawer.Screen
                    name="Profile"
                    component={Profile}
                    options={{ drawerItemStyle: { height: 0 } }}
                />
                <Drawer.Screen name="Reservar cita" component={BookAppointment} options={{ drawerItemStyle: { display: 'flex' } }} />
                <Drawer.Screen name="Tus citas" component={YourAppointments} options={{ drawerItemStyle: { display: 'flex' } }} />
                <Drawer.Screen name="Servicios" component={Services} options={{ drawerItemStyle: { display: 'flex' } }} />
                <Drawer.Screen name="Productos" component={Products} options={{ drawerItemStyle: { display: 'flex' } }} />
                <Drawer.Screen name="Personal" component={Personal} options={{ drawerItemStyle: { display: 'flex' } }} />
                <Drawer.Screen name="Políticas de privacidad" component={PrivacyPolicies} options={{ drawerItemStyle: { display: 'flex' } }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white',
        elevation: 0,
        shadowOpacity: 0,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
        marginTop: 10,
        paddingHorizontal: 15,
    },
    menuIcon: {
        width: 30,
        justifyContent: 'space-around',
        height: 20,
    },
    menuLine: {
        height: 3,
        width: '100%',
        backgroundColor: '#00000033',
        borderRadius: 50,
    },
    logo: {
        backgroundColor: '#FDCCC5',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    userPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});