import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform, Alert } from 'react-native';
import { Input, Button, Icon, Card, SocialIcon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env";
import axios from 'axios';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

export default EditEventComponent = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const [get_data, set_data] = useState([]);

    const getData = async () => {
        const value = await AsyncStorage.getItem('@login');
        const data = JSON.parse(value);

        await axios.get(`${API_URL}/api/show_event/${data.id}`).then(response => {
            set_data(response.data);
        })
    }

    useEffect(() => {
        getData();
    }, [isFocused])

    return (
        <View>
            <ScrollView>
                <Card>
                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={{ marginLeft: 5, marginBottom: 10, marginTop: 10, }}>
                                    Title:
                                </Text>
                            </View>

                            <View>
                                <Text style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
                                    {route.params.title}
                                </Text>
                            </View>
                        </View>
                        <Card.Divider />
                    </View>

                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={{ marginLeft: 5, marginBottom: 10, marginTop: 10, }}>
                                    Content:
                                </Text>
                            </View>

                            <View>
                                <Text style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
                                    {route.params.content}
                                </Text>
                            </View>
                        </View>
                        <Card.Divider />
                    </View>

                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={{ marginLeft: 5, marginBottom: 10, marginTop: 10, }}>
                                    Lattitude:
                                </Text>
                            </View>

                            <View>
                                <Text style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
                                    {route.params.latitude}
                                </Text>
                            </View>
                        </View>
                        <Card.Divider />
                    </View>

                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={{ marginLeft: 5, marginBottom: 10, marginTop: 10, }}>
                                    Longtitude:
                                </Text>
                            </View>

                            <View>
                                <Text style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
                                    {route.params.longitude}
                                </Text>
                            </View>
                        </View>
                        <Card.Divider />
                    </View>

                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                        <View style={{ alignItems: 'center' }}> 
                            <Image source={{ uri: route.params.myimage }} style={{ width: 200, height: 200 }} />
                        </View>
                        <Card.Divider />
                    </View>
                </Card>
            </ScrollView>
        </View>
    )
}