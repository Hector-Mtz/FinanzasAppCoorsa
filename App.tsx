import 'react-native-gesture-handler';
import React, {useState} from 'react';
//React Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';




import {
  ImageBackground,
  StyleSheet,
  Text
} from 'react-native';

//Views
import Login from './assets/views/Login';
import Finanzas from './assets/views/Finanzas';
import NavBar from './assets/components/generals/NavBar';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App(): JSX.Element {

  const [usuarioDatos, setUsuariosDatos] = useState({ name:'User'})
  
  return (
   <NavigationContainer>
      <Drawer.Navigator id='menu' initialRouteName='Login' defaultStatus='closed'  screenOptions={{
       drawerStyle:{
        backgroundColor:'#0A0F2C'
       },
       drawerInactiveTintColor:'white',  
       headerStyle:
       {
         backgroundColor:'#0A0F2C',
       },
       headerTintColor:'#1D96F1' 
      }}
      >
        <Drawer.Screen options={{
          headerShown:false,
        }} name='Login' component={Login}   />
        <Drawer.Screen name='Finanzas'  options={
          {
            headerTitle: (props) => <NavBar  usuarioDatos={usuarioDatos} props={props} {...props} /> 
          }
          
        } component={Finanzas}  />
      </Drawer.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
