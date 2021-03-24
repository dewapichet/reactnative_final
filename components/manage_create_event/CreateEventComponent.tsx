import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { View, Text, StyleSheet, Image, ScrollView, Platform, Alert } from 'react-native';
import { Input, Button, Icon, Card } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env";
import axios from 'axios';
import moment from 'moment';
import MapView, { Marker } from 'react-native-maps';
import { useIsFocused } from '@react-navigation/native';

import CameraComponent from '../../components/CameraComponent';

export default CreateEventComponent = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const [location, setLocation] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [get_title, set_title] = useState('');
    const [get_content, set_content] = useState('');

    const getGeoLocation = async () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
                'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
            );
            return;
        }
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        await setLocation(location);
        console.log(location.coords.latitude)
        console.log(location.coords.longitude)
    }

    const create_event = async () => {
        const value = await AsyncStorage.getItem('@login');
        const data = JSON.parse(value);
        
        let formData = new FormData();
        //formData.append('user_id', data.id);
        formData.append('myimage', {
            uri: Platform.OS === "android" ? route.params.photo : route.params.photo.replace('file://', ''),
             type: 'image/jpeg',
            name: 'image.jpg'
        });
        formData.append('title', get_title);
        formData.append('content', get_content);
        formData.append('latitude', location.coords.latitude);
        formData.append('longitude', location.coords.longitude);

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        await axios.post(`${API_URL}/api/create_event/${data.id}`, formData).then(response => {
            console.log(response.data)
            navigation.navigate('List');
        }); 
    }

    useEffect(() => {
        getGeoLocation();
    }, [isFocused])

    return (
        <View>
            <ScrollView>
                <Card>
                    <Input placeholder='Title' onChangeText={ (e) => set_title(e) } />

                    <Input placeholder='Content' multiline={true} onChangeText={ (e) => set_content(e) } />

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: 10, marginRight: 20, marginTop: 5 }}>
                            <Icon type='font-awesome-5' name='map-marker-alt' size={40} />
                        </View>

                        <View>
                            {
                                location ? (
                                    <View>
                                        <Text style={{ fontSize: 18 }}>latitude: {location.coords.latitude}</Text>
                                        <Text style={{ fontSize: 18, marginTop: 10 }}>longitude: {location.coords.longitude}</Text>
                                    </View>
                                ) : (<View></View>)
                            }
                        </View>

                    </View>

                    <Icon type='material' name='camera' size={45} onPress={() => navigation.navigate('Camera')} />
                    
                    {
                        route.params !== undefined ? (
                            <View>
                                <Image
                                    source={{ uri: Platform.OS === "android" ? route.params.photo : route.params.photo.replace('file://', '') }}
                                    style={{ width: '100%', height: 250, resizeMode: 'contain', marginBottom: 20 }}
                                />

                        <Button title='Submit' onPress={ () => create_event() }
                    />
                            </View>

                        ) : (<View></View>)
                    }


                </Card>
            </ScrollView>
        </View>
    )
}