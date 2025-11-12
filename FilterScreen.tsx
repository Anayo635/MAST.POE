import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Dish } from '../App';

type FilterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Filter'>;
  route: RouteProp<RootStackParamList, 'Filter'>;
};

type FilterType = 'all' | 'starter' | 'main' | 'dessert';

const allDishes: Dish[] = [
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

export default function FilterScreen({ navigation, route }: FilterScreenProps) {
  const [selectedFilter, setSelectedFilter] = React.useState<FilterType>('all');

  const handleFilter = (filterType: FilterType) => {
    setSelectedFilter(filterType);
    let filteredDishes: Dish[];
    
    if (filterType === 'all') {
      filteredDishes = allDishes;
    } else {
      filteredDishes = allDishes.filter(dish => dish.course === filterType);
    }
    
    route.params?.onFilter?.(filteredDishes);
  };

  const filteredDishes = allDishes.filter(dish =>
    selectedFilter === 'all' ? true : dish.course === selectedFilter
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>

      <View style={styles.filterButtons}>
        {(['all', 'starter', 'main', 'dessert'] as FilterType[]).map((filterType) => (
          <TouchableOpacity
            key={filterType}
            style={[
              styles.filterButton,
              selectedFilter === filterType && styles.filterButtonSelected
            ]}
            onPress={() => handleFilter(filterType)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filterType && styles.filterTextSelected
            ]}>
              {filterType.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.results}>
        <Text style={styles.resultsTitle}>
          Showing: {selectedFilter.toUpperCase()} ({filteredDishes.length} items)
        </Text>

        {filteredDishes.map((dish) => (
          <View key={dish.id} style={styles.dishItem}>
            <Text style={styles.dishName}>{dish.name}</Text>
            <Text style={styles.dishCourse}>{dish.course}</Text>
            <Text style={styles.dishPrice}>{dish.price}</Text>
          </View>
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
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  filterButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center'
  },
  filterButtonSelected: {
    backgroundColor: '#e35a51'
  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666'
  },
  filterTextSelected: {
    color: 'white'
  },
  results: {
    flex: 1
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333'
  },
  dishItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  dishCourse: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textTransform: 'capitalize'
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e35a51',
    marginTop: 4
  }
});