import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set} from "firebase/database";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAnalytics } from "@firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyBAFNcTD9UX4DaqGHm33iIOXMJ9m0BCHEc",
  authDomain: "sma-lab-9a63a.firebaseapp.com",
  projectId: "sma-lab-9a63a",
  storageBucket: "sma-lab-9a63a.appspot.com",
  messagingSenderId: "844935189423",
  appId: "1:844935189423:web:cd3ac0b7f1d7357549d55a",
  measurementId: "G-23VZZSRN8B",
  databaseURL: "https://sma-lab-9a63a-default-rtdb.firebaseio.com"
};

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


export default function DatabasePage() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  const saveToDB = () => {
    // Reference to your Firebase Realtime Database
    const database = getDatabase(app);
    //const nameRef = database.ref('names'); // Change 'names' to your desired Firebase database path

    // Push the name to the database
    set(ref(database, 'names/'), {
      username: name
    });

  };

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      <CustomButton title="Save to DB" onPress={saveToDB} />
    </View>
  );
}

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
    padding: 10,
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
