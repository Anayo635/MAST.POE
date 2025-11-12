import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import DetailScreen from './screens/DetailScreen';
import AddDishScreen from './screens/AddDishScreen';
import FilterScreen from './screens/FilterScreen';
import ManageMenuScreen from './screens/ManageMenuScreen';

export type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  Detail: { dish: Dish };
  AddDish: { onAddDish: (dish: Dish) => void };
  Filter: { onFilter: (dishes: Dish[]) => void };
  ManageMenu: { menuItems?: Dish[] };
};

export type Dish = {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  course: 'starter' | 'main' | 'dessert';
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="AddDish" component={AddDishScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="ManageMenu" component={ManageMenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
