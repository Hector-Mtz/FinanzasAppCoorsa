import React,{useEffect, useState}  from 'react'
import axios from 'axios'
import moment from 'moment';

import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  SafeAreaView,
  FlatList
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
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth()+1);
    //Fecha del calendario (tambien para consultar cada que cambie)
    const [dateCalendar, setDateCalendar] = useState(moment(date).format('YYYY-MM'));
    //Datos de calendario
      //Colors
    const ventas = {key: 'v', color: '#44BFFC'};
    const pc = {key: 'pc', color: '#697FEA'};
    const pp = {key: 'pp', color: '#B66BF5'};
    const c = {key: 'c', color: '#56D0C1'}
     //Data
    const [dataCalendar, setDataCalendar] = useState({})

    //Peticiones
    useEffect(() =>  //al menos tiene que ejecutarse una vez
    {
      const lineasNegocioConsulta = async () => 
      {
         await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/getLineasNegocio')
         .then(response => {
             // Handle response
             let newArrayLineasNeg = [];
             newArrayLineasNeg.push({id:null, name:'TODAS'})
             for (let index = 0; index < response.data.length; index++)
             {
                const newLine = response.data[index];
                newArrayLineasNeg.push(newLine);
             }
             //console.log(newArrayLineasNeg)
             setLineasNegocio(newArrayLineasNeg)
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
        await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/getClientes')
        .then(response => {
            // Handle response
            //console.log(response.data);
            let newArrayClientes = [];
            newArrayClientes.push({id:null, nombre:'TODOS'})
            for (let index = 0; index < response.data.length; index++)
            {
              const cliente = response.data[index];
              newArrayClientes.push(cliente)
            }
            setClientes(newArrayClientes)
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
      console.log(cliente)
      if(lineaNegocio == null && cliente == null)
      {
        await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/getTotals',
        {
          params:{
            year: year,
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
      else
      {
        await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/getTotals',
        {
          params:{
            year: year,
            lineas_negocio_id:lineaNegocio,
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
    

    }
    //Solicitud de datos por mes
    const consultarPorMes = async () =>
    {
      if(lineaNegocio == null || cliente == null  )
      {
        await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/getTotals',
        {
          params:{
            year: year,
            month:month,
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
      else
      {
      await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/getTotals',
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
    }
    //Solicitud de datos de fecha
    const consultaCalendario = async (date) => 
    {
      //console.log(date)
      await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/getDataCalendar',{
        params:{
          date:date
        }
      }).then(response => 
        {
          //console.log(response);
          let objectGlobal = {};
          for (let index = 0; index < response.data.ventas.length; index++)  //seteamos las ventas
          {
            const venta = response.data.ventas[index];
            //console.log(fecha.fechaInicial)
            objectGlobal[`${venta.fechaInicial}`] =  
            {
              marked:true,
              selected:false,
              dots:[ventas]
            } 
          }

          for (let index2 = 0; index2 < response.data.pp.length; index2++)  //seteamos las ventas
          {
            const ppTemp = response.data.pp[index2];
            //console.log(ppTemp)
            for(let fecha in objectGlobal)
            {
              if(fecha == ppTemp.fechaDePago)
              {
                objectGlobal[fecha].dots.push(pp)
              }
              /*
              else
              {
                objectGlobal[`${ppTemp.fechaDePago}`] =  {
                  marked:true,
                  dots:[pp]
                }
              }
              */
            }

          }

        for (let index3 = 0; index3 < response.data.pc.length; index3++) 
        {
          const pcTemp = response.data.pc[index3];
          let fechaPc = pcTemp.fecha_alta.toString();
      
          let dia = fechaPc.substring(0,2)

          let mes = fechaPc.substring(3,5)

          let año = fechaPc.substring(6,10)

          let newFecha = año + '-' + mes + '-' +dia;

          for(let fecha in objectGlobal)
          {
            if(fecha == newFecha)
            {
              objectGlobal[fecha].dots.push(pc)
            }
          }
        }

        for (let index4 = 0; index4 < response.data.c.length; index4++)
        {
          const cTemp = response.data.c[index4];
          //console.log(cTemp.created_at.substring(0,10))
          for(let fecha in objectGlobal)
          {
            //console.log(fecha)
          }
          
        }

          setDataCalendar(objectGlobal)
          
        }).catch(err => {
          console.log(err)
        })
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

    //useEffect para cambios y consulta de fechas
    useEffect(() => 
    {
      consultaCalendario(dateCalendar)
    },[dateCalendar])
    
  const sections = [
    {id:0, nombre: 'reportes'},
    {id:1, nombre:'calendar'},
    {id:2, nombre:'ventas'},
    {id:3, nombre:'pp'},
    {id:4, nombre:'depositos'}
  ]

  return (
    <SafeAreaView>
        <FlatList
          data={sections}
          keyExtractor={(item) => item.id }
          renderItem={({item}) => 
         {
           return (
            <View style={{marginVertical:15}}>
               {
                item.nombre == 'reportes' ?
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
                : null
               }
               {
                  item.nombre == 'calendar' ?
                    <DropDownItem title={'Calendario'} icon={'calendar'} dataCalendar={dataCalendar} setDateCalendar={setDateCalendar} />
                  : null
               }
               {
                  item.nombre == 'ventas' ?
                    <DropDownItem title={'Ventas'} icon={'monedas'} lineasNegocio={lineasNegocio} />
                  : null
               }
{
                  item.nombre == 'pp' ?
                     <DropDownItem title={'Por Pagar'} icon={'pago'} />
                  : null
               }
               {
                  item.nombre == 'depositos' ?
                    <DropDownItem title={'Depositos'} icon={'deposito'} />
                  : null
               }
            </View>
           )
         }}
         />
    </SafeAreaView>
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