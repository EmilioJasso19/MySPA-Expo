import React, {useEffect, useState} from "react";
import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import {supabase} from "../lib/supabase";

export default function ScrollSection({table, title}) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems()
            .then()
            .catch(e => console.log(e));
    }, []);

    async function fetchItems() {
        let {data, error} = await supabase
            .from(`${table}`)
            .select('*')

        if (error) {
            console.error('Error:', error);
        } else {
            setItems(data);
        }
    }

    const renderItems = ({item}) => {
        return (
            <View style={styles.itemContainer}>
                <Image
                    source={{uri: item.image_path}}
                    style={styles.itemImage}
                    onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
                />
                <Text style={styles.itemName}>{item.name}</Text>
            </View>
        )
    }

    return (
        <View>
            <Text style={styles.titleSection}>{`${title}`}</Text>
            <FlatList
                data={items}
                horizontal={true}
                renderItem={renderItems}
                style={styles.flatSection}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    titleSection: {
        fontWeight: "500",
        fontSize: 24,
        marginBottom: 18
    },
    flatSection: {
        marginBottom: 36,
        height: 150
    },
    itemContainer: {
        height: 300,
        marginTop: 20,
        marginRight: 12
    },
    itemImage: {
        width: 160,
        height: 95,
        borderRadius: 10
    },
    itemName: {
        fontSize: 16,
        fontWeight: "300"
    },
});