import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform, Alert } from 'react-native';
import { Input, Button, Icon, Card } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env";
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export default Menu = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [getProfile, setProfile] = useState({});

    const getProfileFN = async () => {
        const value = await AsyncStorage.getItem('@login');
        await setProfile(JSON.parse(value));
    }

    const Logout = async () => {
        try {
            await AsyncStorage.removeItem('@login');
            navigation.navigate('Login');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfileFN();
    }, [isFocused]);
    
    return (
        <View>
            {
                getProfile ? (
                    getProfile.user_role === 'member' ? (
                        <Card>
                            <View style={{ flexDirection: 'row', marginBottom: 15, marginTop: 5 }} >
                                <View style={{ width: '50%', alignItems: 'flex-start' }}>
                                    <Icon type="material" name='face' onPress={() => navigation.navigate('Profile')} />
                                </View>
    
                                <View style={{ width: '50%', alignItems: 'flex-start' }}>
                                    <Text>Profile</Text>
                                </View>
                            </View>
                            <Card.Divider />
    
                            <View style={{ flexDirection: 'row', marginBottom: 15, marginTop: 5 }} >
                                <View style={{ width: '50%', alignItems: 'flex-start' }}>
                                    <Icon type="material" name='add' onPress={() => navigation.navigate('Create event')} />
                                </View>
    
                                <View style={{ width: '50%', alignItems: 'flex-start' }}>
                                    <Text>Create event</Text>
                                </View>
                            </View>
                            <Card.Divider />
    
                            <View style={{ flexDirection: 'row', marginBottom: 15, marginTop: 5 }} >
                                <View style={{ width: '50%', alignItems: 'flex-start' }}>
                                    <Icon type="material" name='logout' onPress={() => Logout()} />
                                </View>
    
                                <View style={{ width: '50%', alignItems: 'flex-start' }}>
                                    <Text>Logout</Text>
                                </View>
                            </View>
                            <Card.Divider />
                        </Card>
                    ) : (
                        <Card>
                            <View style={{ flexDirection: 'row'}} >
                                <View style={{ width: '50%', alignItems: 'flex-start' }}>
                                    <Icon type="material" name='logout' onPress={() => Logout()} />
                                </View>
                                <View style={{ width: '50%', alignItems: 'flex-start', marginTop:3 }}>
                                    <Text style={{fontSize:17}}>Logout</Text>
                                </View>
                            </View>
                        </Card>
                    )
                ) : (
                    <View></View>
                )
            }
        </View>
    )
}