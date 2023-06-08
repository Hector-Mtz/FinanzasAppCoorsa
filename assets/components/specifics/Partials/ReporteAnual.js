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
      setLineaNegocioName,
      setLinea,
      //Clientes
      clientes,
      cliente,
      setCliente,
      setClienteName,
      totals,
      //fecha
      year,
      setYear,
      month,
      setMonth
    }
) => 
{

  useEffect(() => 
  {
    for (let index = 0; index < lineasNegocio.length; index++) 
    {
      const lineaNegocioTemp = lineasNegocio[index];
      console.log(lineaNegocioTemp)
      if(lineaNegocioTemp.id === lineaNegocio)
      {
        setLineaNegocioName(lineaNegocioTemp.name)
      }
    }
  },[lineaNegocio])

  useEffect(() => 
  {
    //console.log(clientes)
    for (let index = 0; index < clientes.length; index++) 
    {
      const clienteTemp = clientes[index];
      if(clienteTemp.id === cliente)
      {
        //console.log('son iguales')
        setClienteName(clienteTemp.nombre)
      }
    }
  },[cliente])

return (
 <View style={styles.contenedorReporte}>
    <View style={styles.contenedorTituloCalendar}>
      <Text style={styles.reporteText}>
         Reporte anual
      </Text>
      <CalendarButton type={'anual'} year={year} setYear={setYear} month={month} setMonth={setMonth} />
    </View>
    <View style={{marginTop:10}}>
          <Text style={{color:'black', fontFamily:'Montserrat-Medium', marginBottom:5}}>Líneas de negocio</Text>
          <DropdownSelect   
            onValueChange={(itemValue) => setLinea(itemValue)}
            selectedValue={lineaNegocio}
            placeholder="TODOS"
            dropdownStyle={{
              borderWidth: 0,
              borderColor:'black',
                 
            }}
            checkboxStyle={{
              backgroundColor: '#1D96F1',
              borderRadius: 30, // To get a circle - add the checkboxSize and the padding size
              padding: 5,
              borderColor:'white'
            }}
            optionLabel={'name'}
            optionValue={'id'}
            checkboxLabelStyle={{ color: 'black', fontSize: 15, fontFamily:'Montserrat-Medium' }}
            options={lineasNegocio}
            listHeaderComponent={
              <View style={{alignItems:'center'}}>
                <Text style={{color:'black', fontSize:20, fontFamily:'Montserrat-Medium'}} >
                  Lineas de negocio disponibles
                </Text>
               
              </View>
            }  
            >
          </DropdownSelect>
    </View>
    <View>
          <Text style={{color:'black', fontFamily:'Montserrat-Medium', marginBottom:5}}>Cliente</Text>
          <DropdownSelect   
            onValueChange={(itemValue) => setCliente(itemValue)}
            selectedValue={cliente}
            placeholder="TODAS"
            dropdownStyle={{
              borderWidth: 0,
              borderColor:'black',
              color:'black', fontFamily:'Montserrat-Medium' 
            }}
            checkboxStyle={{
              backgroundColor: '#1D96F1',
              borderRadius: 30, // To get a circle - add the checkboxSize and the padding size
              padding: 10,
              borderColor:'white'
            }}
            optionLabel={'nombre'}
            optionValue={'id'}
            checkboxLabelStyle={{ color: 'black', fontSize: 15,fontFamily:'Montserrat-Medium' }}
            options={clientes}
            listHeaderComponent={
              <View style={{alignItems:'center'}}>
                <Text style={{color:'black', fontSize:20,fontFamily:'Montserrat-Medium'}} >
                 Clientes disponibles
                </Text>
               
              </View>
            }  
            >
          </DropdownSelect>
       </View>
       <View style={styles.contenedorCantidades}>
         <View>
           <View style={[styles.contenedorCantidad, styles.ventas]}>
              <Text style={{color:'white', textTransform:'uppercase', fontFamily:'Montserrat-Medium', fontSize:13}}>Ventas</Text>
              {
                totals !== undefined ?
                <Text style={{color:'white',marginLeft:-10, fontWeight:'bold', fontSize:12}}>${formatoMoney(totals.ventas.toFixed(2))}</Text>
                :
                null
              }
           </View>
           <View style={[styles.contenedorCantidad, styles.pagar]}>
             <Text style={{color:'white', textTransform:'uppercase',fontFamily:'Montserrat-Medium', fontSize:13}}>Por pagar</Text>
              {
                totals !== null ?
                <Text style={{color:'white',marginLeft:-10, fontWeight:'bold', fontSize:12}}>${formatoMoney(totals.pp.toFixed(2))}</Text>
                :
                null
              }
           </View>
         </View>
        <View>
           <View style={[styles.contenedorCantidad, styles.cobrar]}>
             <Text style={{color:'white', textTransform:'uppercase', fontFamily:'Montserrat-Medium', fontSize:12}}>Por cobrar</Text>
             {
                totals !== null ?
                <Text style={{color:'white',marginLeft:-10, fontWeight:'bold', fontSize:12}}>${formatoMoney(totals.pc.toFixed(2))}</Text>
                :
                null
              }
           </View>
           <View style={[styles.contenedorCantidad, styles.cobrado]}>
             <Text style={{color:'white', textTransform:'uppercase', fontFamily:'Montserrat-Medium', fontSize:13}}>Cobrado</Text>
             {
                totals !== null ?
                <Text style={{color:'white',marginLeft:-10, fontWeight:'bold', fontSize:12}}>${formatoMoney(totals.c.toFixed(2))}</Text>
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
      fontFamily:'Montserrat-Medium'
    },
    contenedorCantidades:
    {
      flexDirection:'row',
      marginTop:-18
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