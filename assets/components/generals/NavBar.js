import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import {
  Image,
    StyleSheet,
    Text,
    View,
    Pressable
  } from 'react-native'

const NavBar = ({


}) => {

  const [show, setShow] = useState(false)
  const navigate  = useNavigation();

  const logOut = () =>
  {
    navigate.navigate('Login')
  }
 
  return (
       <View style={styles.contenedor}> 
         <Pressable  onPress={() => {
            setShow(!show)
         }}>
           <Image style={{width:40, height:40}} source={require('../../img/icon_user.png')} />
         </Pressable>
         {show ?
         <View style={styles.logout} >
             <Pressable onPress={() => {
                logOut()
             }}>
                <Text style={{color:'black'}}>Salir</Text>
             </Pressable>
         </View> 
         : null}
       </View>
  )
}

const styles = StyleSheet.create({
    contenedor:
    {
      flexDirection:'row',
      marginRight:15
    },
    text:{
      color:'white',
      fontSize:20,
      marginRight:15,
      marginTop:5
    },
    logout:
    {
       position:'absolute',
       zIndex:6,
       backgroundColor:'white',
       width:60,
       height:30,
       alignItems:'center',
       justifyContent:'center',
       marginTop:35,
       marginLeft:-30
    }
})

export default NavBar
