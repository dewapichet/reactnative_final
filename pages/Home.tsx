import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import {API_URL} from "@env";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import MemberComponent from '../components/MemberComponent';
import MechanicComponent from '../components/MechanicComponent';

export default Home = () => {
    const isFocused = useIsFocused();
    const [getProfile, setProfile] = useState({});

    const getProfileFN = async () => {
        const value = await AsyncStorage.getItem('@login');
        await setProfile(JSON.parse(value));
    }

    useEffect(() => {
        getProfileFN();
    }, [isFocused]);

    return (
        <View style={{ flex: 1 }}>
            <View>
                {
                    getProfile.user_role === 'member' ? (
                        <View>
                            <MemberComponent/>
                        </View>
                    ) : (
                        <View>
                            <MechanicComponent/>
                        </View>
                    )
                }
            </View>
        </View>
    )
}