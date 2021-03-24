import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

export default function CameraComponent(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation(); 

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => {
        setCameraRef(ref);
      }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end'
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={async () => {
            if (cameraRef) {
              let photo = await cameraRef.takePictureAsync();
              console.log('photo', photo); 
              navigation.navigate(props.navigation_name, {
                photo: photo.uri,
              })
            }
          }}>
            <View style={{
              borderWidth: 2,
              borderRadius: 100,
              borderColor: 'white',
              height: 70,
              width: 70,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 50
            }}
            >
              <View style={{
                borderWidth: 2,
                borderRadius: 100,
                borderColor: 'white',
                height: 60,
                width: 60,
                backgroundColor: 'white'
              }} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}