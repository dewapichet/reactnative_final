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

export default Profile = () => {
    const [get_data, set_data] = useState([]);
    const [get_profile, set_profile] = useState('');
    const [get_username, set_username] = useState('');
    const [get_firstname, set_firstname] = useState('');
    const [get_lastname, set_lastname] = useState('');
    const [get_email, set_email] = useState('');
    const [get_age, set_age] = useState('');
    const [get_tel, set_tel] = useState('');
    const [get_province, set_province] = useState('');
    const [get_userrole, set_userrole] = useState('');

    const getData = async () => {
        const value = await AsyncStorage.getItem('@login');
        const data = JSON.parse(value);
        await axios.get(`${API_URL}/api/profile/${data.id}`).then(response => {
            const data_json = [];
            data_json.push(response.data);
            set_data(data_json);
            set_profile(response.data.profile_image);
            set_username(response.data.username);
            set_firstname(response.data.first_name);
            set_lastname(response.data.last_name);
            set_email(response.data.email);
            set_age(response.data.age);
            set_tel(response.data.tel);
            set_province(response.data.province);
            set_userrole(response.data.user_role);
        });
    }

    const updateProfile = async () => {
        const value = await AsyncStorage.getItem('@login');
        const data = JSON.parse(value);
        await axios.put(`${API_URL}/api/update_profile/${data.id}`, {
            first_name: get_firstname,
            last_name: get_lastname,
            email: get_email,
            age: get_age,
            tel: get_tel
        }).then(response => response.data === 'success' ? Alert.alert('Update profile success') : '');
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <View>
            <ScrollView>
                <Card>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={{ uri: `${API_URL}/storage/${get_profile}` }}
                            style={{ width: 200, height: 200, borderRadius: 100, marginBottom: 20 }}
                        />
                    </View>

                    <Input label='Username' value={get_username} editable={false} />

                    <Input label='Firstname' value={get_firstname} onChangeText={(e) => set_firstname(e)} />

                    <Input label='Lastname' value={get_lastname} onChangeText={(e) => set_lastname(e)} />

                    <Input label='Email' value={get_email} onChangeText={(e) => set_email(e)} />

                    <Input label='Age' value={String(get_age)} onChangeText={(e) => set_age(e)} />

                    <Input label='Tel' value={get_tel} onChangeText={(e) => set_tel(e)} />

                    <Input label='Province' value={get_province} editable={false} />

                    <Input label='User role' value={get_userrole} editable={false} />

                    <Button title='Save' onPress={ () => updateProfile() } />
                </Card>
            </ScrollView>
        </View>
    )
}