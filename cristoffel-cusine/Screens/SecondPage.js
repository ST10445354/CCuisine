import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function FoodCategoriesScreen({ route, navigation }) {
  const { savedDish } = route.params;
  const [dishes, setDishes] = useState({
    Starter: [],
    Main: [],
    Dessert: [],
  });
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (savedDish) {
      const updatedDishes = { ...dishes };
      updatedDishes[savedDish.courseType].push(savedDish);
      setDishes(updatedDishes);
    }
  }, [savedDish]);

  const handleButtonPress = (type) => {
    setSelectedCategory(type);
  };

  const renderDishes = () => {
    if (selectedCategory) {
      const categoryDishes = dishes[selectedCategory];
      return categoryDishes.map((dish, index) => (
        <View key={index} style={styles.dishContainer}>
          <Text style={styles.dishText}>Name: {dish.name}</Text>
          <Text style={styles.dishText}>Description: {dish.description}</Text>
          <Text style={styles.dishText}>Price: {dish.price}</Text>
        </View>
      ));
    }
    return <Text style={styles.paragraph}>Select a category to view dishes.</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>Food Categories</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => handleButtonPress('Starter')}
        >
          <Text style={styles.buttonText}>Starter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => handleButtonPress('Main')}
        >
          <Text style={styles.buttonText}>Main</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => handleButtonPress('Dessert')}
        >
          <Text style={styles.buttonText}>Dessert</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dishList}>{renderDishes()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'navy',
    padding: 8,
  },
  backButton: {
    padding: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  paragraph: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  categoryButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dishContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  dishText: {
    fontSize: 16,
  },
  dishList: {
    marginTop: 20,
    padding: 10,
  },
});
