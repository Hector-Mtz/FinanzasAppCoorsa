import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'

const ButtonWatch = (
  modalPorPagar,
  setModalPorpagar,
  ItemAMostrar,
  id,
  itemType,
  setModalFacturas,
  setModalDepositos
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
      if(modalPorPagar.itemType === 'Depositos')
      {
         console.log(modalPorPagar)
         modalPorPagar.setItemAMostrar(modalPorPagar.id)
         modalPorPagar.setModalDepositos(true)
      }
    }}>
       <Image style={{width:20, height:12}} source={require('../../img/eye.png')} />
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