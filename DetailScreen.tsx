import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type DetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Detail'>;
  route: RouteProp<RootStackParamList, 'Detail'>;
};

export default function DetailScreen({ route }: DetailScreenProps) {
  const { dish } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: dish.image }}
        style={styles.dishImage}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.dishName}>{dish.name}</Text>
          <Text style={styles.dishPrice}>{dish.price}</Text>
        </View>
        
        <Text style={styles.description}>{dish.description}</Text>
        <Text style={styles.course}>Course: {dish.course}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  dishImage: {
    width: '100%',
    height: 250
  },
  content: {
    flex: 1,
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  dishName: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1
  },
  dishPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e35a51',
    marginLeft: 10
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15
  },
  course: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    textTransform: 'capitalize'
  }
});