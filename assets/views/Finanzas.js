import React,{useEffect, useState}  from 'react'
import axios from 'axios'

import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'
import Reportes from '../components/specifics/Reportes'
import DropDownItem from '../components/generals/DropDownItem'



const Finanzas = () => {
  //Variables para reportes
    //-Lineas de negocio
    const [lineasNegocio, setLineasNegocio] = useState([])
    const [lineaNegocio, setLinea] =useState('');
    //-Clientes
    const [clientes, setClientes] = useState([])
    const [cliente, setCliente] = useState('');

    //Peticiones
    const lineasNegocioConsulta = async () => 
    {
       await axios.get('https://finanzas.coorsamexico.com/api/getLineasNegocio')
       .then(response => {
           // Handle response
           //console.log(response.data);
           setLineasNegocio(response.data)
       })
       .catch(err => {
           // Handle errors
           console.error(err);
       });
    }

    const clientesConsulta = async () => 
    {
      /*
      await axios.get('https://finanzas.coorsamexico.com/api/getLineasNegocio')
      .then(response => {
          // Handle response
          //console.log(response.data);
          setClientes(response.data)
      })
      .catch(err => {
          // Handle errors
          console.error(err);
      });
      */
    }

    lineasNegocioConsulta()
    clientesConsulta()
  return (
    <ScrollView>
       <Reportes lineasNegocio={lineasNegocio} 
                 lineaNegocio={lineaNegocio} 
                 setLinea={setLinea}
                 clientes={clientes}
                 cliente={cliente}
                 setCliente={setCliente} />
      <DropDownItem title={'Calendario'} icon={'calendar'} />
    </ScrollView>

    
  )
}

const styles = StyleSheet.create({
 
})

export default Finanzas