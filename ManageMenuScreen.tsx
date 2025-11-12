import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Dish } from '../App';

type ManageMenuScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ManageMenu'>;
  route: RouteProp<RootStackParamList, 'ManageMenu'>;
};

type CourseType = 'starter' | 'main' | 'dessert';

const defaultDishes: Dish[] = [
  {
    id: 1,
    name: 'Crispy Calamari',
    price: 'R120',
    description: 'Lightly fried calamari served with lemon aioli and fresh herbs.',
    image: 'https://images.unsplash.com/photo-1563379926898-9574575a45d8',
    course: 'starter'
  }
];

export default function ManageMenuScreen({ navigation, route }: ManageMenuScreenProps) {
  const initialItems = route.params?.menuItems || defaultDishes;
  const [menuItems, setMenuItems] = useState<Dish[]>(initialItems);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [course, setCourse] = useState<CourseType>('main');

  const handleAddDish = () => {
    if (!name || !price || !description) {
      Alert.alert('Error', 'Please fill in name, price, and description');
      return;
    }

    const newDish: Dish = {
      id: Date.now(),
      name: name,
      price: `R${price}`,
      description: description,
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      course: course
    };

    setMenuItems(prev => [...prev, newDish]);
    
    setName('');
    setPrice('');
    setDescription('');
    setImage('');
    
    Alert.alert('Success', 'Dish added successfully!');
  };

  const handleRemoveDish = (dishId: number) => {
    setMenuItems(prev => prev.filter(dish => dish.id !== dishId));
    Alert.alert('Removed', 'Dish removed from menu');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Manage Menu</Text>
      
      <Text style={styles.debugText}>
        Showing {menuItems.length} menu items
      </Text>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Add New Dish</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={name}
          onChangeText={setName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Price (e.g., 120)"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />
        
        <Text style={styles.label}>Course Type:</Text>
        <View style={styles.courseContainer}>
          {(['starter', 'main', 'dessert'] as CourseType[]).map((courseType) => (
            <TouchableOpacity
              key={courseType}
              style={[
                styles.courseButton,
                course === courseType && styles.courseButtonSelected
              ]}
              onPress={() => setCourse(courseType)}
            >
              <Text style={[
                styles.courseText,
                course === courseType && styles.courseTextSelected
              ]}>
                {courseType.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddDish}>
          <Text style={styles.addButtonText}>Add Dish</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>
          Current Menu ({menuItems.length} items)
        </Text>
        
        {menuItems.length === 0 ? (
          <Text style={styles.emptyText}>No dishes in menu. Add some above!</Text>
        ) : (
          menuItems.map((dish) => (
            <View key={dish.id} style={styles.dishCard}>
              <View style={styles.dishInfo}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishPrice}>{dish.price} • {dish.course}</Text>
              </View>
              <TouchableOpacity 
                style={styles.removeBtn}
                onPress={() => handleRemoveDish(dish.id)}
              >
                <Text style={styles.removeBtnText}>X</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  debugText: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
    fontSize: 12
  },
  formSection: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333'
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    fontSize: 16
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  courseContainer: {
    flexDirection: 'row',
    marginBottom: 15
  },
  courseButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
    borderRadius: 6,
    alignItems: 'center'
  },
  courseButtonSelected: {
    backgroundColor: '#e35a51'
  },
  courseText: {
    fontWeight: 'bold',
    color: '#666'
  },
  courseTextSelected: {
    color: 'white'
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  menuSection: {
    marginBottom: 20
  },
  dishCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#e35a51'
  },
  dishInfo: {
    flex: 1
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  dishPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  removeBtn: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  removeBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: 20
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});