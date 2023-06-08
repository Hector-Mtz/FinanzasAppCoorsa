import React from 'react'
import {
   TextInput,
   View,
   Image,
   StyleSheet
} from 'react-native'

const Buscador = (
   {
      busqueda,
      setBusqueda
   }
) => {
  return (
     <View style={{justifyContent:'center', alignContent:'center' ,}}>
          <Image style={styles.iconSearch} source={require('../../img/search.png')} />
          <TextInput
           onChangeText={(newText) => {setBusqueda(newText)}}
           value={busqueda}
           placeholder='Buscar'
           placeholderTextColor={'#9B9B9B'}
           style={styles.input }
            />
     </View>
  )
}

const styles =  StyleSheet.create({
    iconSearch:
    {
       height:20,
       width:20,
       position:'absolute',
       zIndex:2,
       marginTop:15,
       marginLeft:250
    },
    input:
    {
      backgroundColor:'#F2F2F2',
      borderRadius:10,
      textAlign:'left',
      width:300,
      color:'black',
      fontFamily:'Montserrat-Medium'
    }
})

export default Buscador