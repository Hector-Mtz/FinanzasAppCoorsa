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
      lineasNegocio,
      lineaNegocio,
      setLinea
    }
) => {

  return (
    <View>
    <ScrollView horizontal>
        <ReporteAnual lineasNegocio={lineasNegocio} lineaNegocio={lineaNegocio} setLinea={setLinea}  />
        <ReporteMensual lineasNegocio={lineasNegocio} lineaNegocio={lineaNegocio} setLinea={setLinea} />
    </ScrollView>
  </View>

  )
}

const styles = StyleSheet.create({

  })
  
export default Reportes