import React from 'react'
import {
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    View,
    TouchableWithoutFeedback,
    TextInput
  } from 'react-native';

const Login = ({
    //Props Desestructuring
    navigation
}) => 
{
    const navigateToPrincipal = () =>
    {
      navigation.navigate('Finanzas')
    }

  return (
    <ImageBackground source={require('../img/login_fondo.jpg')} style={styles.contenedor}>
       <View style={styles.contenedorPrincipal}>
         <View style = {styles.contenedorLogo}>
          <Image style = {styles.logo_coorsa} source={require('../img/coorsa_logo.png')} />
        </View>
        <View style={styles.contenedorHijo1}> 
          <View >
           <Image style={styles.iconFinanzas} source={require('../img/icon_finanzas.png')} />
          </View>
          <View style={{marginTop:20}}>
            <Text style = {styles.textoPlataforma}>
                Plataforma
            </Text>
            <Text style = {styles.textoFinanzas}>
                Finanzas
            </Text>
          </View>
          <Text style={styles.textBienvenido}>Bienvenido</Text>
          <View style={styles.form}>
             <TextInput style={styles.inputs} textAlignVertical='center' placeholder='USUARIO' placeholderTextColor={'white'} />
             <TextInput style={styles.inputs} placeholder='CONTRASEÑA' placeholderTextColor={'white'} />
            <View style={{marginTop:10}}>
              <TouchableWithoutFeedback onPress={()=> { navigateToPrincipal()}} >
                  <View style={{backgroundColor:'#1D96F1', padding:15, borderRadius:15}}>
                     <Text style={{color:'white', textAlign:'center', fontSize:15}}>Iniciar sesión</Text>
                  </View>
               </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
       </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  contenedorPrincipal:
  {
    marginVertical:30
  },
  contenedorLogo:
  {
    marginLeft:20
  },
  contenedor:
  {
    flex:1
  },
  contenedorHijo1:
  {
    alignItems:'center',
  },
  logo_coorsa:{
    height:25,
    width:80
  },
  iconFinanzas:{
    height:140,
    width:120
  },
  textoPlataforma:{
    textTransform:'uppercase',
    textAlign:'center',
    color:'#1D96F1',
    fontSize:30,
    letterSpacing:2
  },
  textoFinanzas:
  {
    textTransform:'uppercase',
    textAlign:'center',
    color:'white',
    fontSize:40,
    letterSpacing:10
  },
  textBienvenido:
  {
    color:'white',
    textTransform:'uppercase',
    fontSize:20,
    letterSpacing:2,
    marginTop:30
  },
  form:
  {
    width:350,
    marginTop:15
  },
  inputs:
  {
     borderColor:'#1D96F1',
     borderWidth:2,
     borderRadius:20,
     marginVertical:10,
     paddingHorizontal:100,
  }
})

export default Login