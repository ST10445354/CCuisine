import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function EnterNewDishScreen({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [courseType, setCourseType] = useState('');
  const [savedDish, setSavedDish] = useState(null);

  const courseOptions = { 1: 'Starter', 2: 'Main', 3: 'Dessert' };

  const handleSaveMeal = () => {
    if (!name || !description || !price || !courseType) {
      Alert.alert('Error', 'Please fill out all fields before saving.');
      return;
    }
    setSavedDish({ name, description, price, courseType });
  };

  const handleClear = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCourseType('');
    setSavedDish(null);
  };

  const validatePrice = (value) => {
    if (value === '' || /^[0-9]+$/.test(value)) {
      if (value.length <= 3) {
        setPrice(value);
      } else {
        Alert.alert('Error', 'Price cannot exceed 3 digits.');
      }
    } else {
      Alert.alert('Error', 'Please enter digits only.');
    }
  };

  const handleCourseTypeSelect = (type) => {
    setCourseType(type);
  };

  const handleSaveToMenu = () => {
    if (savedDish) {
      // Pass the saved dish to the second page
      navigation.navigate('Client', { savedDish });
      Alert.alert('Saved to Menu', `Dish "${savedDish.name}" has been added to the menu!`);
    } else {
      Alert.alert('Error', 'No dish to save to the menu.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Enter New Dish</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter dish name"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />
      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={validatePrice}
        placeholder="Enter price"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Course Type:</Text>
      <View style={styles.courseTypeContainer}>
        {Object.keys(courseOptions).map((key) => (
          <Button
            key={key}
            title={courseOptions[key]}
            onPress={() => handleCourseTypeSelect(courseOptions[key])}
            color={courseType === courseOptions[key] ? 'blue' : 'gray'}
          />
        ))}
      </View>
      <Button title="Save Meal" onPress={handleSaveMeal} />
      <Button title="Clear" onPress={handleClear} color="red" />
      {savedDish && (
        <View style={styles.savedContainer}>
          <Text style={styles.savedLabel}>Saved Dish:</Text>
          <Text>Name: {savedDish.name}</Text>
          <Text>Description: {savedDish.description}</Text>
          <Text>Price: {savedDish.price}</Text>
          <Text>Course Type: {savedDish.courseType}</Text>
        </View>
      )}
      <View style={{ marginTop: 20 }}>
        <Button title="Save to Menu" onPress={handleSaveToMenu} color="green" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'navy',
  },
  backButton: {
    padding: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  courseTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  savedContainer: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  savedLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
