import React from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import Buscador from '../generals/Buscador'
import ButtonGeneric from '../generals/ButtonGeneric'

const SectionVentas = () => {
  return (
    <View style={styles.contenedor}>
       <View style={styles.header}>
          <View>
           <Buscador  />
          </View>
          <View>
            <ButtonGeneric title={'+'} />
          </View>
       </View>
    </View>
  )
}

const styles = StyleSheet.create(
    {
       contenedor:
       {

       },
       header:
       {
        flexDirection:'row',
        justifyContent:'space-between'
       }
    }
);

export default SectionVentas