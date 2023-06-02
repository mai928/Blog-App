import {
  StyleSheet,
  Text,
  Touchable,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const ModalView = ({onPressHandlers}) => {
  const {onUpdateBlog, onDeleteBlog, onModalClose} = onPressHandlers;

  return (
    <View style={styles.container}>
      <View style={styles.ModalViewContainer}>
        <TouchableOpacity style={styles.touchBTN} onPress={onUpdateBlog}>
          <Text style={styles.textBTN}>Update Blog</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchBTN} onPress={onDeleteBlog}>
          <Text style={styles.textBTN}>Delete Blog</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchBTN} onPress={onModalClose}>
          <Text style={styles.textBTN}>Close Model</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  ModalViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '83%',
    borderRadius: 10,
    padding: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: 'black',
    elevation: 10,
  },
  touchBTN: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 7,
    shadowColor: 'gray',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    elevation: 5,
    marginVertical: 5,
    width: '50%',
  },
  textBTN: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});
