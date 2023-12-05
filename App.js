import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getDatabase, ref, child, get, set} from "firebase/database";
import { initializeApp } from "firebase/app";
import { map, filter } from "rxjs/operators";
import DatabasePage from './DatabasePage';
import LoggedInPage from './LoggedInPage';
import { Accelerometer } from 'expo-sensors';

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

const Stack = createNativeStackNavigator();
// setUpdateIntervalForType(SensorTypes.accelerometer, 400); 

// const subscription = accelerometer
//   .pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > 20))
//   .subscribe(
//     speed => console.log(`You moved your phone with ${speed}`),
//     error => {
//       console.log("The sensor is not available");
//     }
//   );

export default function App() {
  const [greeting, setGreeting] = useState('Hello, ');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="DatabasePage" component={DatabasePage} />
        <Stack.Screen name="LoggedInPage" component={LoggedInPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  function HomeScreen({navigation}) {
    const [name, setName] = useState('');
    const [username, password] = useState('');
    const [{ x, y, z }, setData] = useState({
      x: 0,
      y: 0,
      z: 0,
    });
    Accelerometer.setUpdateInterval(16);
    const accelerationListener = (data) => {
      const database = getDatabase(app);
      console.log(data)
      set(ref(database, 'readings/'), {
        x: data['x'],
        y: data['y'], 
        z: data['z']
      });    
    }
    Accelerometer.addListener(accelerationListener)

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

    const onLoginPressed = () => {

    }

    const onRegisterPressed = () => {

    }

    const navigateNewPage = () => {
      navigation.navigate("DatabasePage");
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter user"
          value={username}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={(text) => setName(text)}
        />
        <CustomButton title="Login" onPress={onLoginPressed} />
        <CustomButton title="Login" onPress={onRegisterPressed} />
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
