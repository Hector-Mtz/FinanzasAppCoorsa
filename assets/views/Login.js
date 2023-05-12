import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    View,
    TouchableWithoutFeedback,
    TextInput,
    Alert
  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({
    //Props Desestructuring
  navigation,
  route //aqui deberian venir los parametros
}) => 
{

    const navigateToPrincipal = () =>
    {
      navigation.navigate('Finanzas')
    }

    useEffect(() => 
    {
       const obtenerDatosStorage = async () => 
       {
         const emailStorage = await AsyncStorage.getItem('email')
        // console.log(emailStorage)
         const passStorage = await AsyncStorage.getItem('pass')
         //console.log(passStorage)
         if(emailStorage !== '' || passStorage !== '' )
         {
           setEmail(emailStorage)
           setPassword(passStorage)
         }
       }
       obtenerDatosStorage()
    },[])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Login = async () => //validaciones y funcion para loguear
    {
       if(email === '' ||  password === '')
       {
         Alert.alert('ERROR', 'Los campos son requeridos', [
          {text:'Aceptar'}
         ])
       }
       else
       {
         axios.post('https://finanzas.coorsamexico.com/api/sanctum/token',{
          email: email,
          password:password,
          device_name:'movil'
         }).then((response) => {
            //console.log(response) 
            navigation.navigate('Finanzas')
            console.log(route)
            //Guardamos los datos en storage
            storeEmail(email)
            storePassword(password)
         }).catch((error) => 
         {
            console.log(error)
            Alert.alert('ERROR', 'Las credenciales son erroneas' , [{
              text:'OK'
            }])
         })
       }
    }

    //save email
    const storeEmail = async (email) => {
      try {
        await AsyncStorage.setItem('email', email)
      } catch (e) {
        // saving error
      }
    }
    //save pass
    const storePassword = async (pass) => {
      try {
        await AsyncStorage.setItem('pass', pass)
      } catch (e) {
        // saving error
      }
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
             <TextInput inputMode='email' onChangeText={(text) => {setEmail(text)}} value= {email}  style={styles.inputs} placeholder='USUARIO' placeholderTextColor={'white'} />
             <TextInput secureTextEntry={true} onChangeText={(text) => {setPassword(text)}} value= {password}  style={styles.inputs} placeholder='CONTRASEÑA' placeholderTextColor={'white'} />
            <View style={{marginTop:10}}>
              <TouchableWithoutFeedback onPress={()=> { Login() }} >
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
     borderWidth:1,
     margin:5,
     borderRadius:15,
     textAlign:'center',
     color:'white'
  }
})

export default Login