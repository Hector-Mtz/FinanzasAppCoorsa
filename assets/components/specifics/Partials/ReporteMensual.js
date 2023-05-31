import React, {useEffect, useState}  from 'react'
import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView
  } from 'react-native'

import DropdownSelect from 'react-native-input-select'
import CalendarButton from '../../generals/CalendarButton'
import { formatoMoney } from '../../../utils/conversiones'

const ReporteAnual = (
    {
      //Lineas de negocio
      lineasNegocio,
      lineaNegocio,
      setLinea,
      //Clientes
      clientes,
      cliente,
      setCliente,
      //fecha
      year,
      setYear,
      month,
      setMonth,
      //totals
      totalsMensual
    }
) => 
{
  return (
    <View style={styles.contenedorReporte}>
    <View style={styles.contenedorTituloCalendar}>
      <Text style={styles.reporteText}>
         Reporte mensual
      </Text>
      <CalendarButton type={'mensual'} year={year} setYear={setYear} month={month} setMonth={setMonth} />
    </View>
    <View style={styles.contenedorCantidades}>
         <View>
           <View style={[styles.contenedorCantidad, styles.ventas]}>
              <Text style={{color:'white', textTransform:'uppercase'}}>Ventas</Text>
              {
                totalsMensual !== undefined ?
                <Text style={{color:'white',marginLeft:-10, fontWeight:'bold', fontSize:14}}>${formatoMoney(totalsMensual.ventas.toFixed(2))}</Text>
                :
                null
              }
           </View>
           <View style={[styles.contenedorCantidad, styles.pagar]}>
             <Text style={{color:'white', textTransform:'uppercase'}}>Por pagar</Text>
              {
                totalsMensual !== null ?
                <Text style={{color:'white',marginLeft:-10, fontWeight:'bold', fontSize:14}}>${formatoMoney(totalsMensual.pp.toFixed(2))}</Text>
                :
                null
              }
           </View>
         </View>
        <View>
           <View style={[styles.contenedorCantidad, styles.cobrar]}>
             <Text style={{color:'white', textTransform:'uppercase'}}>Por cobrar</Text>
             {
                totalsMensual !== null ?
                <Text style={{color:'white',marginLeft:-10, fontWeight:'bold', fontSize:14}}>${formatoMoney(totalsMensual.pc.toFixed(2))}</Text>
                :
                null
              }
           </View>
           <View style={[styles.contenedorCantidad, styles.cobrado]}>
             <Text style={{color:'white', textTransform:'uppercase'}}>Cobrado</Text>
             {
                totalsMensual !== null ?
                <Text style={{color:'white',marginLeft:-10, fontWeight:'bold', fontSize:14}}>${formatoMoney(totalsMensual.c.toFixed(2))}</Text>
                :
                null
              }
           </View>
          </View>
       </View>
  </View>
  )
}

const styles = StyleSheet.create({
  contenedorReporte:{
    backgroundColor:'white',
    borderRadius:10,
    margin:10,
    padding:20, 
    height:420
  },
  contenedorTituloCalendar:
  {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  reporteText:{
    fontSize:20,
    color:'black',

  },
  contenedorCantidades:
  {
    flexDirection:'row',
    marginTop:50
  },
  contenedorCantidad:{
    paddingVertical:15,
    paddingHorizontal:30,
    margin:5,
    borderRadius:10,
    width:150
  },
  ventas:
  {
    backgroundColor:'#44BFFC',
  },
  cobrar:{
    backgroundColor:'#697FEA'
  },
  pagar:
  {
    backgroundColor:'#B66BF5'
  },
  cobrado:{
    backgroundColor:'#56D0C1'
  }
  })
  

export default ReporteAnual