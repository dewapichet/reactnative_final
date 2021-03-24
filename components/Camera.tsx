import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Card, CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CameraComponent from '../components/CameraComponent';

export default function Camera({ navigation }) {
    return ( 
        <CameraComponent navigation_name='Create event' />
    )
}
