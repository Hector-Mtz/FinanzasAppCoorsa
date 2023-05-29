import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import ButtonWatch from './ButtonWatch'

const ItemByClient = (
  name,
  fecha
) => {
  return (
    <View style={styles.contenedor}>
        <Text style={{color:'black'}}>U 5006 CONTROL DE TARIMAS - CENTRO DE SELECCION DE TARIMAS</Text>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
           <Text style={{color:'black'}}>{JSON.stringify(fecha)}</Text>
           <ButtonWatch />
        </View>
    </View>
  )
}

const styles = StyleSheet.create(
    {
        contenedor:
        {
           backgroundColor:'#F2F2F2',
           borderRadius:5,
           padding:5,
           margin:5
        }
    }
)

export default ItemByClient