import React, {useEffect, useState}  from 'react'
import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView
  } from 'react-native'


import DropdownSelect from 'react-native-input-select'

const ReporteAnual = (
    {
        lineasNegocio,
        lineaNegocio,
        setLinea
    }
) => 
{
  return (
    <View style={styles.contenedorReporte}>
    <View style={styles.contenedorTituloCalendar}>
      <Text style={styles.reporteText}>
         Reporte mensual
      </Text>

    </View>
    <View>
          <Text>Líneas de negocio</Text>
          <DropdownSelect   
            onValueChange={(itemValue) => setLinea(itemValue)}
            selectedValue={lineaNegocio}
            placeholder="Linea de negocio"
            dropdownStyle={{
              borderWidth: 0,
              borderColor:'black',
                 
            }}
            checkboxStyle={{
              backgroundColor: '#1D96F1',
              borderRadius: 30, // To get a circle - add the checkboxSize and the padding size
              padding: 10,
              borderColor:'white'
            }}
            optionLabel={'name'}
            optionValue={'code'}
            checkboxLabelStyle={{ color: 'black', fontSize: 15 }}
            options={lineasNegocio}
            listHeaderComponent={
              <View style={{alignItems:'center'}}>
                <Text style={{color:'black', fontSize:20}} >
                  Lineas de negocio disponibles
                </Text>
               
              </View>
            }  
            >
          </DropdownSelect>
    </View>
    <View>
          <Text>Cliente</Text>
          <DropdownSelect   
            onValueChange={(itemValue) => setLinea(itemValue)}
            selectedValue={lineaNegocio}
            placeholder="Cliente"
            dropdownStyle={{
              borderWidth: 0,
              borderColor:'black',
                 
            }}
            checkboxStyle={{
              backgroundColor: '#1D96F1',
              borderRadius: 30, // To get a circle - add the checkboxSize and the padding size
              padding: 10,
              borderColor:'white'
            }}
            optionLabel={'name'}
            optionValue={'code'}
            checkboxLabelStyle={{ color: 'black', fontSize: 30 }}
            options={lineasNegocio}
            listHeaderComponent={
              <View style={{alignItems:'center'}}>
                <Text style={{color:'black', fontSize:20}} >
                  Lineas de negocio disponibles
                </Text>
               
              </View>
            }  
            >
          </DropdownSelect>
       </View>
  </View>
  )
}

const styles = StyleSheet.create({
    contenedorReporte:{
      backgroundColor:'white',
      borderRadius:10,
      margin:10,
      padding:16
    },
    contenedorTituloCalendar:
    {
      flexDirection:'row',
    },
    reporteText:{
      fontSize:20,
      color:'black',
      marginRight:140
    }
  })
  

export default ReporteAnual