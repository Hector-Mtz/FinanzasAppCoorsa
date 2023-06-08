import React, {useEffect, useState}  from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    Text
  } from 'react-native'



import ReporteAnual from './Partials/ReporteAnual'
import ReporteMensual from './Partials/ReporteMensual'
const Reportes = (
    {
      //Lineas de negocio
      lineasNegocio,
      lineaNegocio,
      lineaNegocioName,
      setLineaNegocioName,
      setLinea,
      //Clientes
      clientes,
      cliente,
      clienteName,
      setClienteName,
      setCliente,
      //Totals
      totals,
      totalsMensual,
      //fechas
      year,
      setYear,
      month,
      setMonth
    }
) => {

  return (
    <View>
    <ScrollView horizontal>
        <ReporteAnual lineasNegocio={lineasNegocio}
                      lineaNegocio={lineaNegocio}
                      setLinea={setLinea} 
                      clientes={clientes}
                      cliente={cliente}
                      setCliente={setCliente}
                      totals={totals}
                      year={year}
                      setYear={setYear}
                      month={month}
                      setMonth={setMonth}
                      setClienteName={setClienteName}
                      setLineaNegocioName={setLineaNegocioName}
                       />
        <ReporteMensual lineasNegocio={lineasNegocio} 
                        lineaNegocio={lineaNegocio} 
                        setLinea={setLinea}
                        clientes={clientes}
                        cliente={cliente}
                        setCliente={setCliente}
                        year={year}
                        setYear={setYear}
                        month={month}
                        setMonth={setMonth}
                        totalsMensual={totalsMensual}
                        lineaNegocioName={lineaNegocioName}
                        clienteName={clienteName}
                        />
    </ScrollView>
  </View>

  )
}

const styles = StyleSheet.create({

  })
  
export default Reportes