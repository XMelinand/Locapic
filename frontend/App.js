
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import Homescreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import ChatScreen from "./screens/ChatScreen";
import POIListScreen from "./screens/POIListScreen";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 


import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
import pseudo from './reducers/pseudo';
import newPoi from "./reducers/newPoi";

const store = createStore(combineReducers({pseudo, newPoi}));
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabsNavigator = function () {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Map") {
            iconName = "navigate";
          } else if (route.name === "Chat") {
            iconName = "chatbubbles";
          } else if (route.name === "POIs") {
            iconName = "map-marker";
          }
          if(iconName=='map-marker'){
            return (<FontAwesome name={iconName} size={25} color={color} />)
          }
          if (iconName=='chatbubbles' || iconName=='navigate'){
            return (<Ionicons name={iconName} size={25} color={color} />)
          }

        },
      })}
      tabBarOptions={{
        activeBackgroundColor:'#130f40',
        inactiveBackgroundColor:'#130f40',
        activeTintColor: "#eb4d4b",
        inactiveTintColor: "#FFFFFF",
        margin:'1%',
      }}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="POIs" component={POIListScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="TabsNavigator" component={TabsNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}