import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Dish } from '../App';

type MenuScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Menu'>;
};

const initialMenuItems: Dish[] = [
  {
    id: 1,
    name: 'Crispy Calamari',
    price: 'R120',
    description: 'Lightly fried calamari served with lemon aioli and fresh herbs.',
    image: 'https://images.unsplash.com/photo-1563379926898-9574575a45d8',
    course: 'starter'
  },
  {
    id: 2,
    name: 'Beef Fillet',
    price: 'R280',
    description: 'Premium beef fillet grilled to perfection.',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976',
    course: 'main'
  },
  {
    id: 3,
    name: 'Herb Crusted Salmon',
    price: 'R220',
    description: 'Fresh salmon with crispy herb crust.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    course: 'main'
  },
  {
    id: 4,
    name: 'Chocolate Fondant',
    price: 'R95',
    description: 'Warm chocolate cake with molten center.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e',
    course: 'dessert'
  }
];

export default function MenuScreen({ navigation }: MenuScreenProps) {
  const [menuItems, setMenuItems] = useState<Dish[]>(initialMenuItems);

  const addNewDish = (newDish: Dish) => {
    setMenuItems(prev => [...prev, { ...newDish, id: Date.now() }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Menu</Text>

      <View style={styles.buttonRow}>
        <Button
          title="Add Dish"
          onPress={() => navigation.navigate("AddDish", { onAddDish: addNewDish })}
        />
        <Button
          title="Filter Menu"
          onPress={() => navigation.navigate("Filter", { onFilter: setMenuItems })}
        />
      </View>

      <ScrollView style={styles.menuList}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => navigation.navigate('Detail', { dish: item })}
          >
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCourse}>{item.course}</Text>
            </View>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  menuList: {
    flex: 1
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  itemCourse: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textTransform: 'capitalize'
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e35a51'
  }
});