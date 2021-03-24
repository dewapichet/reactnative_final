import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform, Alert } from 'react-native';
import { Input, Button, Icon, Card } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env";
import axios from 'axios';
import moment from 'moment';
import MapView, { Marker } from 'react-native-maps';

export default MapComponent = ({route, navigation}) => {
    const mapStyle = [{ "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] }, { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }];

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    //thailand
                    latitude: 13.736717,
                    longitude: 100.523186,
                    latitudeDelta: 13.736717,
                    longitudeDelta: 100.523186,
                }}
                customMapStyle={mapStyle}
            >
                <Marker
                    draggable
                    coordinate={{
                        latitude: parseFloat(route.params.lat_test),
                        longitude: parseFloat(route.params.long_test),
                    }}
                    onDragEnd={(e) =>
                        alert(JSON.stringify(e.nativeEvent.coordinate))}
                    title={route.params.firstname + " " + route.params.lastname}
                    //description={'This is a description of the marker'}
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'flex-end',
    },
    map: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    },
});