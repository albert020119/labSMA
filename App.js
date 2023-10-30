import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getDatabase, ref, child, get} from "firebase/database";
import DatabasePage from './DatabasePage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [greeting, setGreeting] = useState('Hello, ');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="DatabasePage" component={DatabasePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  function HomeScreen({navigation}) {
    const [name, setName] = useState('');

    const handleButtonPress = () => {
      setGreeting(`Hello, ${name}`);
    };

    const getFromDB = () => {
      const db = ref(getDatabase())
      get(child(db, `names/username`)).then((snapshot) => {
        if (snapshot.exists()) {
          setGreeting(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    const navigateNewPage = () => {
      navigation.navigate("DatabasePage");
    }

    return (
      <View style={styles.container}>
        <CustomButton title="Navigate to new page" onPress={navigateNewPage} />
        <CustomButton title="Get From DB" onPress={getFromDB} />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <CustomButton title="Say Hello" onPress={handleButtonPress} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{greeting}</Text>
        </View>
      </View>
    );
  }
}

// Rest of the code (CustomButton and styles)


const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 5,
    width: 200,
    marginBottom: 20,
  },
  textContainer: {
    borderWidth: 3,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    borderWidth: 3,
    backgroundColor: 'red',
    padding: 10,
    width: 200,
    alignItems: 'center',
    borderRadius: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
