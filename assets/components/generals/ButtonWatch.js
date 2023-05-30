import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'

const ButtonWatch = (
  modalPorPagar,
  setModalPorpagar,
  ItemAMostrar,
  id,
  itemType,
  setModalFacturas
) => {
  //console.log(modalPorPagar)
  return (
    <Pressable style={styles.button} onPress={() =>
    {
      if(modalPorPagar.itemType === 'Ventas')
      {
        modalPorPagar.setItemAMostrar(modalPorPagar.id)
        modalPorPagar.setModalPorpagar(true)
      }
      if(modalPorPagar.itemType === 'Facturas')
      {
         modalPorPagar.setItemAMostrar(modalPorPagar.id)
         modalPorPagar.setModalFacturas(true)
      }
    }}>
       <Image source={require('../../img/eye.png')} />
    </Pressable>
  )
}

const styles = StyleSheet.create(
    {
        button:
        {
           backgroundColor:'#697FEA',
           width:40,
           paddingVertical:3,
           paddingHorizontal:6,
           borderRadius:12,
           alignItems:'center'
        }
    }
)

export default ButtonWatch