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

export default ShowMechanicComponent = ({route, navigation}) => {
    return (
        <ScrollView> 
            <Card>
                <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 15 }}>Firstname: {route.params.first_name}</Text>
                <Card.Divider/>

                <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 15 }}>Lastname: {route.params.last_name}</Text>
                <Card.Divider/>

                <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 15 }}>Email: {route.params.email}</Text>
                <Card.Divider/>

                <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 15 }}>Age: {route.params.age}</Text>
                <Card.Divider/>

                <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 15 }}>Tel: {route.params.tel}</Text>
                <Card.Divider/>

                <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 15 }}>Title: {route.params.title}</Text>
                <Card.Divider/>

                <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 15 }}>Content: {route.params.content}</Text>
                <Card.Divider/>

                <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 15 }}>Date: {route.params.date_create}</Text>
                <Card.Divider/>

                <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <Icon type='font-awesome-5' name='map-marker-alt' size={40} onPress={ () => navigation.navigate('Map', {
                        lat_test: route.params.latitude,
                        long_test: route.params.longitude,
                        firstname: route.params.first_name,
                        lastname: route.params.last_name,
                    }) } />
                    <Text style={{textAlign:'center'}}>Location</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: `${API_URL}/storage/${route.params.myimage}` }} style={{ width: 200, height: 200 }} />
                </View>

            </Card>
        </ScrollView>
    )
}