import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
const Setting = () => {
  const LOGOUT=()=>{
    auth().signOut()
  }
  return (
    <View>
     <TouchableOpacity onPress={LOGOUT}>
      <Text>LOGOUT</Text>
      </TouchableOpacity>      
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({})