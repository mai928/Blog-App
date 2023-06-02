import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ScrollView,
  Switch,
  Button,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Menu from 'react-native-vector-icons/AntDesign';
import Search from 'react-native-vector-icons/EvilIcons';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ModalView from '../../Components/ModalView';
import BlogCard from '../../Components/BlogCard';
import Catagory from '../../utils/Catagory';
import {EventRegister} from 'react-native-event-listeners';
import CreateBlog from './CreateBlog';
import ThemeContext from '../../ContextStore/Context';
import theme from '../../ContextStore/them';

const Home = ({navigation}) => {

  const theme = useContext(ThemeContext)
  const [isEnabled, setIsEnabled] = useState(false);

  const [blogs, setBlogs] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState([]);
  const [selectedCatagory, setselectedCatagory] = useState('Comdy');

  const getBlogData = () => {
    firestore()
      .collection('UserBlog')
      .get()
      .then(collectionSnapshot => {
        const data = [];
        collectionSnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        setBlogs(data);
      });
  };

  useEffect(() => {
    getBlogData();

  }, []);





  const onModalOpen = cardId => {
    setModelOpen(true);
    setSelectedCardId(cardId);
  };

  const moveToBlogScreen = BlogData => {
    navigation.navigate('Blog', {BlogData});
  };

  const onViewBlog = BlogData => {
    moveToBlogScreen(BlogData);
  };
  const onUpdateBlog = () => {
    navigation.navigate('CreateBlog', {id: selectedCardId});
    setSelectedCardId(null);
    setModelOpen(false);
  };

  const onDeleteBlog = () => {
    setModelOpen(false);
    firestore()
      .collection('UserBlog')
      .doc(selectedCardId)
      .delete()
      .then(() => {
        console.log('User Deleted');
      });

    setSelectedCardId(null);
  };
  const onModalClose = () => {
    setModelOpen(false);
    setSelectedCardId(null);
  };



    

  return (
    <ScrollView  contentContainerStyle ={{backgroundColor:theme.background}}>
      <View style={{padding: 20}}>
        <StatusBar hidden />
        <Modal visible={modelOpen} animationType="fade" transparent={true}>
          <ModalView
            blogs={blogs}
            onPressHandlers={{
              onUpdateBlog,
              onDeleteBlog,
              onModalClose,
            }}
          />
        </Modal>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Menu name="menuunfold" color="#050A30" size={20} style={{color:theme.color}} />
          <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Switch
              value={isEnabled}
              onValueChange={(value) => {
                setIsEnabled(value)
                EventRegister.emit('changeTheme', value);
              }}
            />
            <Search style={{color:theme.color}} name="search" color="#050A30" size={30} />
          </View>
        </View>
        <View style={styles.header}>
          <Text style={[styles.headingText,{color:theme.color}]}>Discover</Text>
          <Text style={[styles.innerText ,{color:theme.gray}]}>New Blogs</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginHorizontal: 5,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          {Catagory.map(item => (
            <TouchableOpacity onPress={()=>{setselectedCatagory(item.name)}}>
              <Text
                style={
                  selectedCatagory === item.name
                    ? [styles.SelectedCatagory,{color:theme.background ,backgroundColor:theme.color}]
                    : [styles.catagory ,{color:theme.color ,backgroundColor:theme.background}]
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

       
      </View>
       <FlatList numColumns={2}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}
          data={blogs}
          key={item=>item.id}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <BlogCard
                moveToBlogScreen={moveToBlogScreen}
                onModalOpen={onModalOpen}
                Blog={item}
              />
            );
          }}
        />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  primaryContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    margin: 10,
    alignItems: 'center',
  },
  addIcon: {
    // position: 'absolute',
    top: 50,
    left: '45%',
    zIndex: 1,
  },
  headingText: {
    fontSize: 35,
    fontFamily: 'Nunito-Black',
    color: '#050A30',
    fontWeight: 'bold',
  },
  innerText: {
    color: '#AEB8C4',
    fontSize: 13,
  },
  catagory: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#C3CEDA',
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginEnd: 5,
    color: '#050A30',
    fontWeight: '500',
    fontSize: 14,
  },
  SelectedCatagory: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#C3CEDA',
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginEnd: 5,
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
    backgroundColor: '#050A30',
  },
  ContainerLight: {
    backgroundColor: 'white',
  },
  ContainerDark: {
    backgroundColor: '#050A30',
  },
});
