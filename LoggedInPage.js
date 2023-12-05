import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set} from "firebase/database";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAnalytics } from "@firebase/analytics";


export default function LoggedInPage() {
  return (
    <View style={styles.container}>
        LOGGED IN
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
