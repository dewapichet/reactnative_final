import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import {API_URL} from "@env";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ShowEventComponent from '../components/manage_create_event/ShowEventComponent';

export default MemberComponent = () => {
    return (
        <View>
            <ShowEventComponent/>
        </View>
    )
}