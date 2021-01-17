import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SearchScreen extends React.Component {
 render() {

  return (
   <View style={styles.viewStyle}>

    <Text>search</Text>

   </View>

  )
 }
}

const styles = StyleSheet.create({

 viewStyle: {

  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'

 }
})
