import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import Login from './android/app/srcs/Screens/auth/Login';
import Register from './android/app/srcs/Screens/auth/Register';
import Blog from './android/app/srcs/Screens/main/Blog';
import CreateBlog from './android/app/srcs/Screens/main/CreateBlog';
import BottomTabNavigation from './android/app/srcs/Components/BottomTabNavigation';
import ThemeContext from './android/app/srcs/ContextStore/Context'
import {EventRegister} from 'react-native-event-listeners';
import theme from './android/app/srcs/ContextStore/them';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();


export const App = () => {

  const [logout, setLogout] = useState(true);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const config = {
    apiKey: 'AIzaSyAAHfNqQbR0UWRNtC2sw57n8QUoycSyILc',
    authDomain: '',
    databaseURL: '',
    appId: 'blog-app-54aa1',
    storageBucket: 'blog-app-54aa1.appspot.com',
    projectId: 'blog-app-54aa1',
    messagingSenderId: '',
  };

  let app;
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(config);
  } else {
    app = firebase.app();
  }
  async function onAuthStateChange(user) {
    if (user){
      setLogin(true);
      setLogout(false);
    } else {
      setLogin(false);
      setLogout(true);
    }

    if (loading) {
      setLoading(false);
    }
  }

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuthStateChange);
    return subscribe;
  }, []);


  if (loading) {
    return <ActivityIndicator size={32} color="" />;
  }

  if (!login && logout) {
    return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Register" component={Register} />
          </Tab.Navigator>
        </NavigationContainer>
    );
  }

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        /> */}
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="BottomTabNavigation"
            component={BottomTabNavigation}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Blog"
            component={Blog}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="CreateBlog"
            component={CreateBlog}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

const AppProvider = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      'changeTheme',
      data => {
        setIsEnabled(data);
        console.log(data);
      },
      [],
    );

    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });
  return (
    <ThemeContext.Provider value={isEnabled ===true ? theme.dark :theme.light}>
        <App />
    </ThemeContext.Provider>
  );
};

export default AppProvider;


