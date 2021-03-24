import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform, Alert, RefreshControl } from 'react-native';
import { Input, Button, Icon, Card, SocialIcon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env";
import axios from 'axios';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default ShowEventComponent = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);
    const [get_data, set_data] = useState([]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => {
            getData();
            setRefreshing(false);
        });
    }, []);

    const getData = async () => {
        const value = await AsyncStorage.getItem('@login');
        const data = JSON.parse(value);

        await axios.get(`${API_URL}/api/show_event/${data.id}`).then(response => {
            set_data(response.data);
        })
    }

    const getDelete = async (id) => {
        await Alert.alert(
            "Confirmation",
            "you want delete now ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        axios.delete(`${API_URL}/api/delete_event/${id}`).then(response => {
                            console.log('success')
                        });
                    }
                }
            ]
        );
    }

    useEffect(() => {
        getData();
    }, [isFocused])

    return (
        <View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Card>
                    {
                        get_data.map((u, i) => {
                            return (
                                <View key={i} style={{ marginLeft: 10, marginRight: 10 }}>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        <View style={{ width: '50%' }}>
                                            <Text style={{ marginLeft: 5, marginBottom: 10, marginTop: 10, fontSize:18 }} onPress={() => navigation.navigate('View event', {
                                                title: u.title,
                                                content: u.content,
                                                myimage: `${API_URL}/storage/${u.myimage}`,
                                                latitude: u.latitude,
                                                longitude: u.longitude,
                                                date_create: u.date_create,
                                            })}>
                                                {u.title}
                                            </Text>
                                        </View>

                                        <View style={{ width: "40%" }}>
                                            <Text style={{ marginLeft: 5, marginBottom: 10, marginTop: 10, fontSize:18 }}>
                                                {u.date_create}
                                            </Text>
                                        </View>

                                        <View style={{ width: "10%" }}>
                                            <Text style={{ marginLeft: 5, marginBottom: 10, marginTop: 10, color: 'red', fontSize:18 }} onPress={() => getDelete(u.id)} >
                                                Del
                                            </Text>
                                        </View>
                                    </View>
                                    <Card.Divider />
                                </View>
                            )
                        })
                    }
                </Card>
            </ScrollView>
        </View>
    )
}