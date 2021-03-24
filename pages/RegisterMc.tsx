import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {API_URL} from "@env";
import axios from 'axios';

export default RegisterMc = ({ navigation }) => {
    const [getDataSelect, setDataSelect] = useState([]);

    const [getFirstname, setFirstname] = useState('');
    const [getLastname, setLastname] = useState('');
    const [getUsername, setUsername] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getConfirmPassword, setConfirmPassword] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPassportId, setPassportId] = useState('');
    const [getAge, setAge] = useState('');
    const [getTel, setTel] = useState('');
    const [getProvince, setProvince] = useState('');

    const [getImagePassport, setImagePassport] = useState(null);
    const [getImageCertificate, setImageCertificate] = useState(null);

    const pickImagePassport = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [12, 16],
            quality: 1,
        });

        if (!result.cancelled) {
            setImagePassport(result.uri);
        }
    };

    const pickImageCertificate = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [12, 16],
            quality: 1,
        });

        if (!result.cancelled) {
            setImageCertificate(result.uri);
        }
    };

    const get_select_picker = async () => {
        await axios.get(`${API_URL}/api/province`).then(response => {
            let data = [];
            for (let i = 0; i !== response.data.length; i++) {
                data.push({ label: response.data[i].name_th, value: response.data[i].name_th });
            }
            setDataSelect(data);
        });
    }

    const register = async () => {
        let formData = new FormData();
        formData.append('passport_image', {
            uri: Platform.OS === "android" ? getImagePassport : getImagePassport.replace('file://', ''),
            type: 'image/jpeg',
            name: 'image.jpg'
        });
        formData.append('passport_certificate_image', {
            uri: Platform.OS === "android" ? getImageCertificate : getImageCertificate.replace('file://', ''),
            type: 'image/jpeg',
            name: 'image.jpg'
        });


        formData.append('username', getUsername);
        formData.append('password', getPassword);
        formData.append('first_name', getFirstname);
        formData.append('last_name', getLastname);
        formData.append('email', getEmail);
        formData.append('age', getAge);
        formData.append('tel', getTel);
        formData.append('passport_id', getPassportId);
        formData.append('province', getProvince);
        formData.append('user_role', 'wait'); //mechanic
        // console.log(formData)
        if (getPassword !== getConfirmPassword) {
            Alert.alert('Password && Confirm password not match')
        } else {
            await axios.post(`${API_URL}/api/register`, formData).then(response => {
                Alert.alert('Register success');
                navigation.navigate('Login');
            });
        }
    }

    useEffect(() => {
        (async () => { 
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        get_select_picker();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Input placeholder='Firstname' onChangeText={(e) => setFirstname(e)} />
                <Input placeholder='Lastname' onChangeText={(e) => setLastname(e)} />
                <Input placeholder='Username' onChangeText={(e) => setUsername(e)} />
                <Input placeholder='Password' secureTextEntry={true} onChangeText={(e) => setPassword(e)} />
                <Input placeholder='Confirm password' secureTextEntry={true} onChangeText={(e) => setConfirmPassword(e)} />
                <Input placeholder='Email' onChangeText={(e) => setEmail(e)} />
                <Input placeholder='Passport id' keyboardType='numeric' onChangeText={(e) => setPassportId(e)} />
                <Input placeholder='Age' keyboardType='numeric' onChangeText={(e) => setAge(e)} />
                <Input placeholder='Tel' keyboardType='numeric' onChangeText={(e) => setTel(e)} />

                <RNPickerSelect
                    placeholder={{
                        label: 'Please select province',
                        value: null,
                    }}
                    onValueChange={(value) => setProvince(value)}
                    items={getDataSelect}
                    style={{ ...pickerSelectStyles }}
                />

                <View style={{ alignItems: 'center' }}>
                    <Icon name='camera' type='material' size={50} onPress={pickImagePassport} />
                    <Text>Passport image</Text>
                    {getImagePassport && <Image source={{ uri: getImagePassport }} style={{ width: 200, height: 200 }} />}
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Icon name='camera' type='material' size={50} onPress={pickImageCertificate} />
                    <Text>Passport Certificate</Text>
                    {getImageCertificate && <Image source={{ uri: getImageCertificate }} style={{ width: 200, height: 200 }} />}
                </View>

                <Button title='Register' onPress={ () => register() } />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: '10%',
        marginRight: '10%'
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        // fontSize: 16,
        // paddingTop: 13,
        // paddingHorizontal: 10,
        // paddingBottom: 12,
        // borderWidth: 1,
        // borderColor: 'gray',
        // borderRadius: 4,
        // backgroundColor: 'white',
        // color: 'black',
        color: 'black'
    },
    inputAndroid: {
        color: 'black'
    }
});