import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Dish } from '../App';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const sampleMenuItems: Dish[] = [
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

const calculateAveragePrices = (dishes: Dish[]): {[key: string]: number} => {
  const courseTotals: {[key: string]: { sum: number, count: number }} = {
    starter: { sum: 0, count: 0 },
    main: { sum: 0, count: 0 },
    dessert: { sum: 0, count: 0 }
  };

  for (let i = 0; i < dishes.length; i++) {
    const dish = dishes[i];
    const course = dish.course;
    const priceNumber = parseInt(dish.price.replace(/[^0-9]/g, ''));
    
    if (courseTotals[course]) {
      courseTotals[course].sum += priceNumber;
      courseTotals[course].count += 1;
    }
  }

  const averages: {[key: string]: number} = {};
  
  for (const course in courseTotals) {
    if (courseTotals[course].count > 0) {
      averages[course] = courseTotals[course].sum / courseTotals[course].count;
    } else {
      averages[course] = 0;
    }
  }

  return averages;
};

const formatCourseName = (course: string): string => {
  return course.charAt(0).toUpperCase() + course.slice(1);
};

const countTotalItems = (dishes: Dish[]): number => {
  let count = 0;
  let i = 0;
  
  while (i < dishes.length) {
    count++;
    i++;
  }
  
  return count;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [menuItems] = useState<Dish[]>(sampleMenuItems);
  const averagePrices = calculateAveragePrices(menuItems);
  const totalItems = countTotalItems(menuItems);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Christoffel's Kitchen</Text>
      <Text style={styles.subtitle}>Private Chef Services</Text>

      <View style={styles.priceCard}>
        <Text style={styles.cardTitle}>📊 Menu Statistics</Text>
        <Text style={styles.totalItems}>Total Menu Items: {totalItems}</Text>
        
        <View style={styles.averagesContainer}>
          <Text style={styles.averagesTitle}>Average Prices:</Text>
          
          {Object.entries(averagePrices).map(([course, avgPrice]) => (
            <View key={course} style={styles.priceRow}>
              <Text style={styles.courseName}>
                {formatCourseName(course)}:
              </Text>
              <Text style={styles.coursePrice}>
                R{avgPrice.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Image 
        source={{uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836'}}
        style={styles.image}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button 
            title="View Menu"
            onPress={() => navigation.navigate('Menu')}
            color="#e35a51"
          />
        </View>
        
        <View style={styles.buttonWrapper}>
          <Button 
            title="Filter Menu"
            onPress={() => navigation.navigate('Filter')}
            color="#2196F3"
          />
        </View>
        
        <View style={styles.buttonWrapper}>
          <Button 
            title="Manage Menu"
            onPress={() => navigation.navigate('ManageMenu', { 
              menuItems: menuItems 
            })}
            color="#4CAF50"
          />
        </View>
      </View>

      <View style={styles.breakdownCard}>
        <Text style={styles.cardTitle}>🍽️ Course Breakdown</Text>
        {['starter', 'main', 'dessert'].map((course) => {
          const courseItems = menuItems.filter(dish => dish.course === course);
          return (
            <View key={course} style={styles.breakdownRow}>
              <Text style={styles.breakdownText}>
                {formatCourseName(course)}: {courseItems.length} items
              </Text>
            </View>
          );
        })}
      </View>
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
    marginBottom: 10,
    textAlign: 'center',
    color: '#333'
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: 'gray',
    textAlign: 'center'
  },
  priceCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#e35a51'
  },
  breakdownCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50'
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center'
  },
  totalItems: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#666',
    textAlign: 'center'
  },
  averagesContainer: {
    marginTop: 10
  },
  averagesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  courseName: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500'
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e35a51'
  },
  breakdownRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  breakdownText: {
    fontSize: 16,
    color: '#555'
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 30,
    borderRadius: 12
  },
  buttonContainer: {
    marginBottom: 30,
    width: '100%'
  },
  buttonWrapper: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden'
  }
});