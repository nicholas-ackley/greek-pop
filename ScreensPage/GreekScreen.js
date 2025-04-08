import React from 'react'
import { View, Text, StyleSheet } from 'react-native';


const GreekScreen = ({user}) => {
  return (
  <View style={styles.container}>
    <Text style={styles.text}>Hello</Text>
  </View>
  )
}

export default GreekScreen;


const styles = StyleSheet.create({
  container:{
    flex:1,
    justfiyContent:'center',
    alignItems:'center',
    backgroundColor:'blue',
    },
    text:{
      fontSize:20,
      fontWeight:'bold',
      color:'black',
    }
  });