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
      lineaNegocioName,
      setLinea,
      //Clientes
      clientes,
      cliente,
      clienteName,
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
    <View style={{marginTop:10, flexDirection:'column'}}>
       <Text style={{color:'black', fontFamily:'Montserrat-Bold', marginBottom:5}}>Línea de negocio actual:</Text>
       <Text style={{color:'black', fontFamily:'Montserrat-Medium', marginBottom:5}}>{lineaNegocioName}</Text>
    </View>
    <View style={{marginTop:10, flexDirection:'column'}}>
       <Text style={{color:'black', fontFamily:'Montserrat-Bold', marginBottom:5}}>Cliente actual:</Text>
       <Text style={{color:'black', fontFamily:'Montserrat-Medium', marginBottom:5}}>{clienteName}</Text>
    </View>
    <View style={styles.contenedorCantidades}>
         <View>
           <View style={[styles.contenedorCantidad, styles.ventas]}>
              <Text style={{color:'white', textTransform:'uppercase', fontFamily:'Montserrat-Medium', fontSize:12}}>Ventas</Text>
              {
                totalsMensual !== undefined ?
                <Text style={{color:'white',marginLeft:-10, fontWeight:'bold', fontSize:12}}>${formatoMoney(totalsMensual.ventas.toFixed(2))}</Text>
                :
                null
              }
           </View>
           <View style={[styles.contenedorCantidad, styles.pagar]}>
             <Text style={{color:'white', textTransform:'uppercase',fontFamily:'Montserrat-Medium', fontSize:12}}>Por pagar</Text>
              {
                totalsMensual !== null ?
                <Text style={{color:'white',marginLeft:-10, fontWeight:'bold', fontSize:12}}>${formatoMoney(totalsMensual.pp.toFixed(2))}</Text>
                :
                null
              }
           </View>
         </View>
        <View>
           <View style={[styles.contenedorCantidad, styles.cobrar]}>
             <Text style={{color:'white', textTransform:'uppercase', fontFamily:'Montserrat-Medium', fontSize:12}}>Por cobrar</Text>
             {
                totalsMensual !== null ?
                <Text style={{color:'white',marginLeft:-10, fontWeight:'bold', fontSize:12}}>${formatoMoney(totalsMensual.pc.toFixed(2))}</Text>
                :
                null
              }
           </View>
           <View style={[styles.contenedorCantidad, styles.cobrado]}>
             <Text style={{color:'white', textTransform:'uppercase',fontFamily:'Montserrat-Medium', fontSize:12}}>Cobrado</Text>
             {
                totalsMensual !== null ?
                <Text style={{color:'white',marginLeft:-10, fontWeight:'bold', fontSize:12}}>${formatoMoney(totalsMensual.c.toFixed(2))}</Text>
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
    height:430
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
    marginTop:10
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