import React,{useState, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    Animated
  } from 'react-native'


const DropDownItem = (
    {
        title,
        icon
    }
) => {

  //Animacion para mostrar
  let [show, setShow] = useState(false);
  const [animacion] = useState(new Animated.Value(0)) 

  useEffect(() => 
  {
     if(show) //mostramos
     {
       Animated.spring(
        animacion,{
            toValue:50,
            useNativeDriver:false
        }
       ).start()
     }
     else //ocultamos
     {
       Animated.spring(
        animacion, {
            toValue:0,
            useNativeDriver:false
        }
       ).start()
     } 
 },[show])

 const stylesToMostrar = {
    width:animacion,
    heigth:animacion
 }

  const icons = [
    {calendar:'../../img/calendario_icon.png'},
    {money:'../../img/monedas_icon.png'},
    {pago:'../../img/pago_icon.png'},
    {dowm:'../../img/down_icon.png'}
  ]

  const icontemp = '../../img/calendario_icon.png'

  return (
    <Pressable style={styles.contenedor} onPress={() => {setShow(!show)}}>
      <View style={styles.headerCard}>
         <Text style={styles.titulo}>
            {title}
         </Text>
         <Image source={require(icontemp)} />
      </View>
      <View style={[styles.contenido, stylesToMostrar]}>

      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    contenedor:
    {
      backgroundColor:'white',
      borderRadius:10,
      margin:10,
      padding:16
    },
    titulo:{
        fontSize:20,
        color:'black'
    },
    headerCard:{
       flexDirection:'row',    
    },
    contenido:
    {
        
    }

})

export default DropDownItem
