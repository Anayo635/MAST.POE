import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Dish } from '../App';

type AddDishScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddDish'>;
  route: RouteProp<RootStackParamList, 'AddDish'>;
};

type CourseType = 'starter' | 'main' | 'dessert';

export default function AddDishScreen({ navigation, route }: AddDishScreenProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [course, setCourse] = useState<CourseType>('main');

  const handleAddDish = () => {
    if (!name || !price || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newDish: Dish = {
      id: Date.now(),
      name,
      price: `R${price}`,
      description,
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      course
    };

    if (route.params?.onAddDish) {
      route.params.onAddDish(newDish);
    }

    Alert.alert('Success', 'Dish added successfully!');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Dish</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Image URL (optional)"
        value={image}
        onChangeText={setImage}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: 'white'
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
    justifyContent: 'space-between',
    marginBottom: 20
  },
  courseButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center'
  },
  courseButtonSelected: {
    backgroundColor: '#e35a51'
  },
  courseText: {
    fontSize: 14,
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
  }
});