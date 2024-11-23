import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/FirstPage';
import EnterNewDishScreen from './Screens/SecondPage';
import FoodCategoriesScreen from './Screens/ThirdPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chef" component={EnterNewDishScreen} />
        <Stack.Screen name="Client" component={FoodCategoriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
