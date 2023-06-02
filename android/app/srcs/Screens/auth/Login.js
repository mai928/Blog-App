import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Button,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const onLogin = () => {
    auth().signInWithEmailAndPassword(email, password);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.primaryInput}
        value={email}
        placeholder="Email"
        onChangeText={email => {
          setEmail(email);
        }}
      />
      <TextInput
        style={[styles.primaryInput, {marginBottom: 30}]}
        value={password}
        placeholder="Password"
        onChangeText={password => {
          setPassword(password);
        }}
      />
      <Button onPress={onLogin} title="Login" />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  primaryInput: {
    width: '80%',
    margin: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  touchableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  displayPicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'gray',
  },
});
