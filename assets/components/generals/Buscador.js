import React from 'react'
import {
   TextInput,
   View,
   Image,
   StyleSheet
} from 'react-native'

const Buscador = (
   {
      padding,
   }
) => {
  return (
     <View>
        <View style={styles.contenedorBuscador}>
          <Image style={styles.iconSearch} source={require('../../img/search.png')} />
          <TextInput
           placeholder='Buscar'
           placeholderTextColor={'#9B9B9B'}
           style={styles.input }
            />
        </View>
     </View>
  )
}

const styles =  StyleSheet.create({
    contenedorBuscador:
    {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    iconSearch:
    {
       height:20,
       width:20,
       position:'absolute',
       zIndex:2,
       marginTop:18,
       marginLeft:230
    },
    input:
    {
      backgroundColor:'#F2F2F2',
      borderRadius:10,
      textAlign:'left',
      paddingHorizontal:150
    }
})

export default Buscador