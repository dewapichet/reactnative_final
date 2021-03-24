import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import {API_URL} from "@env";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Login = ({ navigation }) => {
    const [getUsername, setUsername] = useState('');
    const [getPassword, setPassword] = useState('');

    const login = async () => {
        await axios.post(`${API_URL}/api/login`, {
            username: getUsername,
            password: getPassword
        }).then(response => {
            if (response.data === 'error') {
                Alert.alert('Username or password wrong');
            } else {
                if (response.data.user_role === 'member') {
                    Alert.alert('Login success');
                    const jsonValue = JSON.stringify(response.data);
                    AsyncStorage.setItem('@login', jsonValue);
                    navigation.navigate('Home');
                } else if (response.data.user_role === 'mechanic') {
                    Alert.alert('Login success');
                    const jsonValue = JSON.stringify(response.data);
                    AsyncStorage.setItem('@login', jsonValue);
                    navigation.navigate('Home');
                } else {
                    Alert.alert('Please wait admin comfirmation');
                }
            }
        });
    }

    const check_login = async () => {
        const value = await AsyncStorage.getItem('@login');
        if (value !== null) {
            navigation.navigate('Home');
        }
    }

    useEffect(() => {
        check_login();
    }, []);

    return (
        <View style={styles.container}>
            <Icon
                name='sc-telegram'
                type='evilicon'
                color='#517fa4'
                size={150}
            />
            <Input placeholder='Username' onChangeText={(e) => setUsername(e)} />
            <Input placeholder='Password' secureTextEntry={true} onChangeText={(e) => setPassword(e)} />
            <Button title='Login' onPress={ () => login() } />
            <View style={{ alignItems: 'center', marginTop: 10}}>
                <Text style={{color: 'gray'}} onPress={() => navigation.navigate('Register')}>Register</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: '10%',
        marginRight: '10%'
    }
});