import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Check from 'react-native-vector-icons/AntDesign';
import {globalStyles} from '../../utils/globalStyle';

let oldCoverImageURL;

const CreateBlog = ({route, navigation}) => {
  const [title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [CoverImage, setCoverImage] = useState();

  let id = route.params?.id;

  const uid = auth().currentUser.uid;

  const UploadImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      data => setCoverImage(data.assets[0].uri),
    );
  };

  const oncheck = () => {
    if (id) {
      onUpdate(id);
      return;
    }
    oncreate();
  };

  const UploadCoverImage = async uid => {
      const spiltPath = CoverImage.split('/');
      const imageName = spiltPath[spiltPath.length - 1];
      const reference = storage().ref(`${uid}/images/${imageName}`);
      const data = await reference.putFile(CoverImage);
      return await storage().ref(data.metadata.fullPath).getDownloadURL();
    
  };

  const oncreate = async () => {
    if (!title && !Content) {
      return false;
    }
    navigation.navigate('BottomTabNavigation');
    try {
      // const downloadURL = await UploadCoverImage(uid);
      let download = null;
      if (CoverImage) {
        const spiltPath = CoverImage.split('/');
        const imageName = spiltPath[spiltPath.length - 1];
        const reference = storage().ref(`${uid}/images/${imageName}`);
        const data = await reference.putFile(CoverImage);
        download = await storage().ref(data.metadata.fullPath).getDownloadURL();
      }
      firestore()
        .collection('UserBlog')
        .add({
          title: title,
          content: Content,
          coverImage: download,
          time: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => console.log('User Added'));
    } catch (error) {
      console.log('created :::', error);
    }
  };




  const getBlogData = id => {
    firestore()
      .collection('UserBlog')
      .doc(id)
      .get()
      .then(snapShot => {
        const data = snapShot.data();
        setTitle(data.title);
        setContent(data.content);
        setCoverImage(data.coverImage);
        oldCoverImageURL = data.coverImage;
      });
  };
  
  const onUpdate = async id => {
    navigation.navigate('BottomTabNavigation');
    try {
      let downloadURL = oldCoverImageURL;
      if (oldCoverImageURL !== CoverImage) {
        downloadURL = await UploadCoverImage(uid);
      }

      firestore()
        .collection('UserBlog')
        .doc(id)
        .update({
          title:title,
          content: Content,
          coverImage: downloadURL,
          LastUpdated: firestore.FieldValue.serverTimestamp(),
        }).then(()=>console.log('Updated Done'))
    } catch (error) {
      console.log('updated :::', error);
    }
  };

  useEffect(() => {
    if (id) {
      getBlogData(id);
    }
  }, [id]);


  return (
    <ScrollView
      style={{...globalStyles.primaryContainer, paddingVertical: 40}}
      keyboardShouldPersistTaps={'always'}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 22,
            color: '#050A30',
            fontWeight: 'bold',
            marginBottom: 30,
          }}>
          CREATE BLOG
        </Text>
        <Check onPress={oncheck} name="checkcircle" size={22} color="purple" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={2}
          value={title}
          onChangeText={text => setTitle(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Content</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={9}
          value={Content}
          onChangeText={text => setContent(text)}
          underlineColorAndroid="transparent"
        />
      </View>

      <View style={{flexDirection: 'row', margin: 20, alignItems: 'center'}}>
        <Image style={styles.img} source={{uri: CoverImage}} />
        <TouchableOpacity onPress={UploadImage} style={styles.touchBTN}>
          <Text style={{...globalStyles.btnText, fontWeight: '700'}}>
            Upload Cover Image
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateBlog;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 20,
    marginVertical: 10,
    textAlignVertical: 'top',
    borderRadius: 5,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  img: {
    resizeMode: 'cover',
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  touchBTN: {
    marginVertical: 20,
    backgroundColor: 'purple',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginStart: 20,
  },
});
