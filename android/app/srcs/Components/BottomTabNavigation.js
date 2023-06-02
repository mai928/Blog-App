import {StyleSheet, Text, View} from 'react-native';
import React, {useState ,useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NotificationIcon from 'react-native-vector-icons/Ionicons';
import HomeIcon from 'react-native-vector-icons/FontAwesome';
import FavouriteIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingIcon from 'react-native-vector-icons/Ionicons';
import Dot from 'react-native-vector-icons/Entypo';
import Add from 'react-native-vector-icons/Entypo';

import Home from '../Screens/main/Home';
import Blog from '../Screens/main/Blog';
import Favorite from '../Screens/main/Favorite';
import Notification from '../Screens/main/Notification';
import Setting from '../Screens/main/Setting';
import CreateBlog from '../Screens/main/CreateBlog';
import ThemeContext from '../ContextStore/Context';
const BottomTabNavigation = ({navigation}) => {
  const Tab = createBottomTabNavigator();
  const theme = useContext(ThemeContext)
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 10,
          borderTopColor: theme.background,
          backgroundColor:theme.background
        },
        tabBarActiveTintColor:theme.color,
      }}>
      <Tab.Screen
        options={{
          tabBarLabelStyle: {display: 'none'},
          headerShown: false,
          tabBarIcon: ({color}) => (
            <View style={{alignItems: 'center'}}>
              <HomeIcon name="home" size={25} color={color} />
              {color === theme.color ? (
                <Dot name="dot-single" size={15} color={color} />
              ) : null}
            </View>
          ),
        }}
        name="home"
        component={Home}
      />

      <Tab.Screen
        options={{
          tabBarLabelStyle: {display: 'none'},

          tabBarIcon: ({color}) => (
            <View style={{alignItems: 'center'}}>
              <FavouriteIcon
                name="puzzle-heart-outline"
                size={25}
                color={color}
              />
              {color === theme.color ? (
                <Dot name="dot-single" size={15} color={color} />
              ) : null}
            </View>
          ),
        }}
        name="favorite"
        component={Favorite}
      />

      <Tab.Screen
        options={{
          tabBarLabelStyle: {display: 'none'},

          tabBarIcon: ({color}) => (
            <View style={styles.addIcon}>
              <Add
                color="white"
                name="plus"
                size={20}
                onPress={() => navigation.navigate('CreateBlog')}
              />
            </View>
          ),
        }}
        name="createBlog"
        component={CreateBlog}
      />

      <Tab.Screen
        options={{
          tabBarLabelStyle: {display: 'none'},

          tabBarIcon: ({color}) => (
            <View style={{alignItems: 'center'}}>
              <NotificationIcon
                name="notifications-outline"
                size={25}
                color={color}
              />
              {color === theme.color ? (
                <Dot name="dot-single" size={15} color={color} />
              ) : null}
            </View>
          ),
        }}
        name="notification"
        component={Notification}
      />

      <Tab.Screen
        options={{
          tabBarLabelStyle: {display: 'none'},

          tabBarIcon: ({color}) => (
            <View style={{alignItems: 'center'}}>
              <SettingIcon name="md-settings-outline" size={25} color={color} />
              {color === theme.color ? (
                <Dot name="dot-single" size={15} color={color} />
              ) : null}
            </View>
          ),
        }}
        name="setting"
        component={Setting}
      />
    </Tab.Navigator>
  );
};
{
  /// notifications-outline
  ///puzzle-heart-outline    heart-multiple-outline   heart-plus-outline
  ///md-settings-outline
}

export default BottomTabNavigation;

const styles = StyleSheet.create({
  addIcon: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 50,
    opacity: 0.9,
    shadowColor: '#2535D9',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,

    elevation: 24,
  },
});
