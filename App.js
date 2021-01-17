import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import TransactionScreen from './Screens/TransactionScreen';
import SearchScreen from './Screens/SearchScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

const TabNavigator = createBottomTabNavigator(
  {

    Transaction: { screen: TransactionScreen },
    Search: { screen: SearchScreen }

  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {

        const routeName = navigation.state.routeName;

        // routeName => Screen Which Is Active
        //addingImages to routeName

        if (routeName === 'Transaction') {
          return (
            <Image
              style={{ width: 40, height: 40 }}
              source={require('./assets/book.png')}

            />
          )
        }
        else if (routeName === 'Search') {
          return (
            <Image
            
             style={{ width: 40, height: 40 }}
              source={require('./assets/searchingbook.png')}
            
            
            />
          )
        }
      }
    })


  }


)

const AppContainer = createAppContainer(TabNavigator)


export default class App extends React.Component {
  render() {

    return (

      <AppContainer />

    )
  }
}
