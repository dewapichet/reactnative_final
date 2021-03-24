import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//pages
import Login from './pages/Login';
import RegisterMC from './pages/RegisterMc';
import RegisterMember from './pages/RegisterMember';
import Home from './pages/Home';
import ShowEventComponent from './components/manage_create_event/ShowEventComponent';
import CreateEventComponent from './components/manage_create_event/CreateEventComponent';
import ViewEventComponent from './components/manage_create_event/ViewEventComponent';
import ShowMechanicComponent from './components/manage_create_event/ShowMechanicComponent';
import MapComponent from './components/MapComponent';
import Profile from './pages/Profile';
import Menu from './pages/Menu';
import Camera from './components/Camera'

function RegisterScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Mechanic') {
            iconName = focused
              ? 'settings'
              : 'settings';
          } else if (route.name === 'Member') {
            iconName = focused ? 'person' : 'person';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} type='material' size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Mechanic" component={RegisterMC} />
      <Tab.Screen name="Member" component={RegisterMember} />
    </Tab.Navigator>
  );
}

function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'List') { 
            iconName = focused
              ? 'list'
              : 'list';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'widgets' : 'widgets';
          }

          // You can return any component that you like here!
          return <Icon type="material" name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="List" component={Home} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
}


export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}options={{
          headerShown :false
        }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={TabScreen} options={{
          headerLeft: () => null, headerRight: () => null
        }} />
        <Stack.Screen name='Show event' component={ShowEventComponent} />
        <Stack.Screen name='Create event' component={CreateEventComponent} />
        <Stack.Screen name='View event' component={ViewEventComponent} />
        <Stack.Screen name='Show mechanic' component={ShowMechanicComponent} />
        <Stack.Screen name='Map' component={MapComponent} />
        <Stack.Screen name='Camera' component={Camera} />
        <Stack.Screen name='Profile' component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

