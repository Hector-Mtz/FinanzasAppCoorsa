import React, { useState } from 'react'
import { Pressable, View, Text, StyleSheet, Image, Animated } from 'react-native'
import ItemByClient from './ItemByClient'
import Pagination from './Pagination'
import axios from 'axios'

const DropDownClient = (
  item
) =>

 {
  let nombre = item.item.nombre;
  let total = item.item.total_ventas;
  let id = item.item.id;
  const [show, setShow] = useState(false);

  const desplegar = async (id) => 
  {
    await axios.get('https://finanzas.coorsamexico.com/api/ventasByClienteApi',
    {
      params:{
        cliente: id
      }
    })
    .then(response => {
        // Handle response
        console.log(response.data);
    })
    .catch(err => {
        // Handle errors
        console.error(err);
    });
  }

  return (
    <View >
        <View style={style.contenedor}>
          <Text style={style.text}>{nombre}</Text>
          <Pressable style={style.buttonDesplegable} onPress={() => {desplegar(id)}}>
              <Text style={style.textButton}>
                  {total}
              </Text>
              <Image style={style.downArrow} source={require('../../img/down_arrow.png')} />
          </Pressable>
      </View>
      <View>
      
      </View>
    </View>
  )
}

const style = StyleSheet.create({
    contenedor:
    {
      flexDirection:'row',
      justifyContent:'space-between',
      marginVertical:2
    },
    text:
    {
      color:'black',
      textTransform:'uppercase',
      letterSpacing:2,
      fontSize:12,

    },
    buttonDesplegable:
    {
      backgroundColor:'#1D96F1',
      paddingHorizontal:18,
      paddingVertical:2,
      borderRadius:15,
      flexDirection:'row',
      alignItems:'center'
    },
    textButton:
    {
        color:'white',
        fontSize:12,
        //fontWeight:'bold'
    },
    downArrow:
    {
        marginLeft:15
    }
})
export default DropDownClient