import React,{useEffect, useState}  from 'react'
import axios from 'axios'

import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable
} from 'react-native'
import Reportes from '../components/specifics/Reportes'
import DropDownItem from '../components/generals/DropDownItem'
const Finanzas = (
  {
    
  }
) => {
  //Variables para reportes
    //-Lineas de negocio
    const [lineasNegocio, setLineasNegocio] = useState([])
    const [lineaNegocio, setLinea] =useState(null);
    //-Clientes
    const [clientes, setClientes] = useState([])
    const [cliente, setCliente] = useState(null);
    //Totals Anual
    const [totals, setTotals] =useState({"c": 0, "pc": 0, "pp": 0, "ventas": 0});
    //Totals Mensual
    const [totalsMensual, setTotalsMensual] = useState({"c": 0, "pc": 0, "pp": 0, "ventas": 0});

    //Fechas para consultar
    let date = new Date();
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth()+1)

    //Peticiones
    useEffect(() =>  //al menos tiene que ejecutarse una vez
    {
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
      lineasNegocioConsulta()
    },[])

    useEffect(() => 
    {
      const clientesConsulta = async () => 
      {
        await axios.get('https://finanzas.coorsamexico.com/api/getClientes')
        .then(response => {
            // Handle response
            //console.log(response.data);
            setClientes(response.data)
        })
        .catch(err => {
            // Handle errors
            console.error(err);
        });
      }
      clientesConsulta()
    },[])

    //Solicitud de datos año
    const consultarInforInicio =  async() => 
    {
      await axios.get('https://finanzas.coorsamexico.com/api/getTotals',
      {
        params:{
          year: year,
          lineas_negocio_id: lineaNegocio,
          cliente_id: cliente
        }
      })
      .then(response => {
          // Handle response
          //console.log(response.data);
          setTotals(response.data)
       
      })
      .catch(err => {
          // Handle errors
          console.error(err);
      });
    }
    //Solicitud de datos por mes
    const consultarPorMes = async () =>
    {
      await axios.get('https://finanzas.coorsamexico.com/api/getTotals',
      {
        params:{
          year: year,
          month:month,
          lineas_negocio_id: lineaNegocio,
          cliente_id: cliente
        }
      }).then(response => {
        // Handle response
         console.log(response.data);   
         setTotalsMensual(response.data)    
       })
       .catch(err => {
           // Handle errors
           console.error(err);
       });
    }
    //UseEffeect
    useEffect(() =>
    {
      if(year)
      {
        //console.log(year)
        consultarInforInicio()
        consultarPorMes()
      }
    },[year])

    //Solicitud de datos por mes
    useEffect(() => 
    {
      //console.log(month)
      consultarPorMes()
    },[month])

    useEffect(() =>
    {
      if(lineaNegocio !== '')
      {
         consultarInforInicio()
         consultarPorMes()
      }
    },[lineaNegocio])

    useEffect(() => 
    {
      consultarInforInicio()
      consultarPorMes()
    },[cliente])
     
  return (
    <ScrollView style={styles.contenedor}>

       <View style={styles.contenedorReportes}>
         <Text style={styles.textFinanzas}>
           Finanzas
         </Text>
         <Reportes lineasNegocio={lineasNegocio} 
                 lineaNegocio={lineaNegocio} 
                 setLinea={setLinea}
                 clientes={clientes}
                 cliente={cliente}
                 setCliente={setCliente} 
                 totals={totals}
                 totalsMensual={totalsMensual}
                 year={year}
                 setYear={setYear}
                 month={month}
                 setMonth={setMonth}
                 />
       </View>
       <DropDownItem title={'Calendario'} icon={'calendar'} />
       <DropDownItem title={'Ventas'} icon={'monedas'} />
       <DropDownItem title={'Por Pagar'} icon={'pago'} />
       <DropDownItem title={'Depositos'} icon={'deposito'} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contenedor:
  {
    backgroundColor:'#F2F2F2',
    marginTop:15
  },
  textFinanzas:{
    color:'black',
    marginTop:10,
    marginLeft:20,
    fontSize:25,
    marginBottom:5
  },
  contenedorReportes:
  {
    borderRadius:15,
    backgroundColor:'#F2F2F2',
    marginTop:-18
  }
})

export default Finanzas