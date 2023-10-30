import React from 'react';
import { Modal, View, Text, TextInput, Button } from 'react-native';

const NamePopup = ({ visible, onClose, onNameSubmit }) => {
  const [name, setName] = React.useState('');

  const handleSubmit = () => {
    onNameSubmit(name);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
          <Text>Enter your name:</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

export default NamePopup;
