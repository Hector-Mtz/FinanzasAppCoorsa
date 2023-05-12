import React from 'react'
import {Text, Pressable, StyleSheet} from 'react-native'

const ButtonGeneric = (
    {
        title
    }
) => {
  return (
    <Pressable style={styles.button}>
        <Text style={{color:'white', fontSize:15, fontWeight:'bold'}}>
           {title}
        </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button:
    {
        backgroundColor:'#1D96F1',
        padding: 10 ,
        borderRadius:15
    }
})

export default ButtonGeneric