import React from 'react';
import Home from './pages/Home'
import {SafeAreaView, StyleSheet} from "react-native";
import Sidebar from "./components/Sidebar";
import 'react-native-gesture-handler';

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Home />
            {/*<Sidebar />*/}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});