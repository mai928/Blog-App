import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const Register = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [displayPicture, setDisplayPicture] = useState();
  const [people, setPeople] = useState([]);

  const onPickPick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      // data => setInfo({...info, displayPicture: data.assets[0].uri}),
      data => setDisplayPicture(data.assets[0].uri),
    );
  };

  const onClickPick = () => {
    launchCamera(
      {
        mediaType: 'photo',
      },
      // data => setInfo({...info, displayPicture: data.assets[0].uri}),
      data => setDisplayPicture(data.assets[0].uri),
    );
  };

  const handleChange = name => value => {
    setInfo({[name]: value});
  };

  const config = {
    apiKey: 'AIzaSyAAHfNqQbR0UWRNtC2sw57n8QUoycSyILc',
    authDomain: '',
    databaseURL: '',
    appId: 'blog-app-54aa1',
    storageBucket: 'blog-app-54aa1.appspot.com',
    projectId: 'blog-app-54aa1',
    messagingSenderId: '',
  };

  async function onRegister() {
    if (!name && !email) {
      return;
    }
    try {
      let app;
      if (firebase.apps.length === 0) {
        app = await firebase.initializeApp(config);
      } else {
        app = await firebase.app();
      }

      const { user: {uid}} = await auth().createUserWithEmailAndPassword(email.trim(), password);

      let downloadURL = null;
      if (displayPicture) {
        const spiltPath = displayPicture.split('/');
        const imageName = spiltPath[spiltPath.length - 1];
        const reference = storage().ref(`${uid}/images/${imageName}`);
        const data = await reference.putFile(displayPicture);
        downloadURL = await storage()
          .ref(data.metadata.fullPath)
          .getDownloadURL();
      }

      firestore()
        .collection('users')
        .doc(uid)
        .set({
          email,
          name,
          password,
          displayPicture: downloadURL,
        })
        .then(() => console.log('Done'));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.displayPicture}
        source={{uri: !displayPicture ? null : displayPicture}}
      />
      <View style={styles.touchableContainer}>
        <TouchableOpacity onPress={onPickPick}>
          <Text>Pick Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClickPick}>
          <Text>Click Picture</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.primaryInput}
        value={name}
        placeholder="Name"
        onChangeText={text => {
          setName(text);
        }}
      />
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
      <Button onPress={onRegister} title="Register" />
    </View>
  );
};

export default Register;

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
