import React from 'react';
//React Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  ImageBackground,
  StyleSheet
} from 'react-native';

//Views
import Login from './assets/views/Login';
import Finanzas from './assets/views/Finanzas';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Finanzas' component={Finanzas} />
      </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
