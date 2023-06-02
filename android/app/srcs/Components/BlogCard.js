import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeContext from '../ContextStore/Context';

const BlogCard = ({Blog, moveToBlogScreen, onModalOpen}) => {
  const theme = useContext(ThemeContext);

  const {title, content, coverImage} = Blog;
  return (
    <View style={{marginHorizontal: 5, marginStart: 10}}>
      <TouchableOpacity
        onPress={() => {
          moveToBlogScreen(Blog);
        }}
        style={[styles.container, {backgroundColor: theme.background}]}>
        <TouchableWithoutFeedback>
          <Ionicons
            onPress={() => onModalOpen(Blog.id)}
            style={{position: 'absolute', top: 10, right: 10, zIndex: 1}}
            name="ios-ellipsis-vertical-circle"
            color="white"
            size={22}
          />
        </TouchableWithoutFeedback>

        <Image style={[styles.img]} source={{uri: coverImage}} />
        <Text
          style={[
            styles.title,
            {color: theme.color, backgroundColor: theme.background},
          ]}>
          {title !== undefined ? title.slice(0,35) : title}
        </Text>
     
      </TouchableOpacity>
    </View>
  );
};

export default BlogCard;

const styles = StyleSheet.create({
  container: {
    width: 165,
    height: 180,
    marginBottom:80,
    backgroundColor: 'white',
    borderColor: 'black',
  },
  card: {
    height: '100%',
    width: '100%',
  },
  img: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 5,
    borderWidth: 1,
  },
  title: {
    marginVertical:7,
    color: '#050A30',
    fontSize:17,
    fontWeight: '500',
    marginHorizontal:5
  },
});
