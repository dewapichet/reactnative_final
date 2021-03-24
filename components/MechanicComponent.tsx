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

export default MechanicComponent = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);
    const [get_data, set_data] = useState([]);
    const [getProfile, setProfile] = useState({});

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => {
            getData();
            setRefreshing(false);
        });
    }, []);

    const getProfileFN = async () => {
        const value = await AsyncStorage.getItem('@login');
        await setProfile(JSON.parse(value));
    }

    const getData = async () => {
        const value = await AsyncStorage.getItem('@login');
        const data = JSON.parse(value);

        await axios.get(`${API_URL}/api/show_all`).then(response => {
            set_data(response.data);
        })
    }

    useEffect(() => {
        getData();
        getProfileFN();
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
                                <View key={i}>
                                    {
                                        getProfile.province === u.data_event_relation.province ? (
                                            <View>
                                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                                    <View style={{ width: '50%' }}>
                                                        <Text style={{ marginBottom: 15, marginLeft: 10, marginRight: 10 }} onPress={() => navigation.navigate('Show mechanic', {
                                                            first_name: u.data_event_relation.first_name,
                                                            last_name: u.data_event_relation.last_name,
                                                            email: u.data_event_relation.email,
                                                            age: u.data_event_relation.age,
                                                            tel: u.data_event_relation.tel,
                                                            province: u.data_event_relation.province,
                                                            title: u.title,
                                                            content: u.content,
                                                            latitude: u.latitude,
                                                            longitude: u.longitude,
                                                            myimage: u.myimage,
                                                            date_create: u.date_create,
                                                        })}>{u.title}</Text>
                                                    </View>

                                                    <View style={{ width: '50%' }}>
                                                        <Text style={{ marginBottom: 15, marginLeft: 10, marginRight: 10 }}>{u.date_create}</Text>
                                                    </View>
                                                </View>
                                                <Card.Divider />
                                            </View>
                                        ) : (
                                            <View></View>
                                        )
                                    }
                                </View>
                            )
                        })
                    }
                </Card>
            </ScrollView>
        </View>
    )
}