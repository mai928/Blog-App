import {
  StyleSheet,
  Text,
  Image,
  View,
  StatusBar,
  ScrollView,
  Switch,
} from 'react-native';
import Back from 'react-native-vector-icons/Fontisto';
import Heart from 'react-native-vector-icons/FontAwesome';
import Forward from 'react-native-vector-icons/Entypo';
import {CapitalizeFirstLetter} from 'lib/strings';

import React, {useContext} from 'react';
import ThemeContext from '../../ContextStore/Context';

const Blog = ({route, navigation}) => {
  const theme = useContext(ThemeContext);
  const {title, content, coverImage} = route.params.BlogData;

  String.prototype.Capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: theme.background, margin: 0},
      ]}>
      <StatusBar hidden />
      <View
        style={{
          position: 'absolute',
          top: 10,
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 1,
        }}>
        <Back
          onPress={() => navigation.goBack()}
          style={styles.IconBack}
          name="arrow-left-l"
          size={20}
          color="white"
        />
        <Switch style={styles.ToggleIcon} />
      </View>

      <View>
        <Image style={styles.img} source={{uri: coverImage}} />
        <Heart style={styles.heartIcon} name="heart" size={20} color="red" />
        <Forward style={styles.forwardIcon} name="forward" size={20} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.box,
            {
              transform: [{rotate: '-90deg'}],
            },
          ]}>
          <Text style={[styles.content, {color: theme.color}]}>MAI</Text>
          <Text style={[styles.content, {color: theme.color}]}>MAI</Text>
        </View>

        <View style={{width: 340}}>
          <Text style={[styles.content, {color: theme.color}]}>{content}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Blog;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    margin: 10,
  },
  img: {
    resizeMode: 'cover',
    width: '100%',
    height: 350,
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    position: 'absolute',
    fontSize: 27,
    fontWeight: '500',
    bottom: 100,
    left: 20,
    color: 'white',
  },
  IconBack: {
    // position: 'absolute',
    // top: 20,
    left: 20,
    // zIndex: 1,
  },
  ToggleIcon: {
    // position: 'absolute',
    // top: 20,
    left: 290,
    // zIndex: 1,
  },
  heartIcon: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    zIndex: 1,
    borderColor: 'white',
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  forwardIcon: {
    position: 'absolute',
    bottom: 0,
    right: 70,
    zIndex: 1,
    borderColor: 'white',
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  content: {
    margin: 10,
    fontSize: 16,
    lineHeight: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 50,
    width: 50,
    marginVertical: 40,
    // backgroundColor: "#61dafb",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
