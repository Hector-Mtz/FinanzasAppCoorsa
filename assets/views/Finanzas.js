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
import ViewDocument from '../components/generals/ViewDocument';
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
      //console.log(cliente)
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
      if(lineaNegocio == null &&  cliente == null  )
      {
        await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/getTotals',
        {
          params:{
            year: year,
            month:month,
          }
        }).then(response => {
          // Handle response
           //console.log(response.data);   
           setTotalsMensual(response.data)    
         })
         .catch(err => {
             // Handle errors
             console.error(err);
         });
      }
      else
      {
        console.log(lineaNegocio)
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
    const consultaCalendario = async (date, lineaNegocio_id, cliente_id) => 
    {
      //console.log(date +' - '+lineaNegocio_id +' - '+cliente_id)
      await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/getDataCalendar',{
        params:{
          date:date,
          linea_negocio_id: lineaNegocio_id,
          cliente_id:cliente_id
        }
      }).then(response => 
        {
          //console.log(response);
          let objectGlobal = {};
          if(response.data.ventas.length === 0)
          {
             for (let index = 0; index < response.data.pp.length; index++) 
             {
               const ppTemp = response.data.pp[index];
               objectGlobal[`${ppTemp.fechaDePago}`] =  
               {
                 marked:true,
                 selected:false,
                 dots:[pp]
               } 
             }

             //Recorrido c
             for (let index3 = 0; index3 < response.data.c.length; index3++) 
             {
               let y = 1 //variable que aumenta
               let x = 0; //variable para validar
               const cTemp = response.data.c[index3];
               //console.log(cTemp)
               let newDate =  cTemp.created_at.toString(); //substring(0,10);
               let dateAComparar = newDate.substring(0,10);
   
               //console.log(dateAComparar)
   
               for(let clave in objectGlobal)
               {
                 if(clave === dateAComparar)
                 {
                   objectGlobal[clave].dots.push({color:'#56D0C1'})
                   x = 1 ;
                 }
                 else
                 {
                   if (index3 === (response.data.c.length-1) && x===0 && y === Object.keys(objectGlobal).length)
                   {
                     objectGlobal[`${dateAComparar}`] =  
                     {
                       marked:true,
                       selected:false,
                       dots:[c]
                     } 
                   }  
                 }
                 y++
               }
         
             }

                         //Recorrido pc
            for (let index2 = 0; index2 < response.data.pc.length; index2++) 
            {
              let y = 1 //variable que aumenta
              let x = 0; //variable para validar
              const pcTemp = response.data.pc[index2];
              for(let fecha in objectGlobal)
              {
                if(fecha === pcTemp.fechaInicial)
                {
                  objectGlobal[fecha].dots.push(pc)
                  x = 1 ;
                }
                else
                {
                  if (index2 === (response.data.pc.length-1) && x===0 && y === Object.keys(objectGlobal).length)
                  {
                    objectGlobal[`${pcTemp.fechaInicial}`] =  
                    {
                      marked:true,
                      selected:false,
                      dots:[pc]
                    } 
                  }
                }
                y++
              }
              
            }
          }
          else
          {
            for (let index = 0; index < response.data.ventas.length; index++)
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
             //Recorrido para pp
             if(response.data.pp.length > 0)
             {
                for (let index = 0; index < response.data.pp.length; index++)
                {
                   let y = 1
                   let x = 0;
                   const ppTemp = response.data.pp[index];
                   //console.log(ppTemp.fechaDePago)
                   for(let clave in objectGlobal)
                   {
                    //console.log(index)
                    //console.log(response.data.pp.length)
                      if(ppTemp.fechaDePago === clave)
                      {
                        objectGlobal[clave].dots.push(pp);
                        x = 1  
                      }
                      else
                      {
                        if (index === (response.data.pp.length-1) && x===0 && y === Object.keys(objectGlobal).length)
                        {
                          objectGlobal[`${ppTemp.fechaDePago}`] =  
                          {
                            marked:true,
                            selected:false,
                            dots:[pp]
                          } 
                        }
                        }        
                      y++
                    //console.log(y)
                   }
                }
             }

             if(response.data.pc.length > 0)
             {
               for (let index2 = 0; index2 < response.data.pc.length; index2++) 
               {
                 let y = 1 //variable que aumenta
                 let x = 0; //variable para validar
                 const pcTemp = response.data.pc[index2];
                 for(let fecha in objectGlobal)
                  {
                    if(fecha === pcTemp.fechaInicial)
                    {
                      objectGlobal[fecha].dots.push({color: '#697FEA'})
                      x = 1 ;
                    }
                    else
                    {
                      if (index2 === (response.data.pc.length-1) && x===0 && y === Object.keys(objectGlobal).length)
                      {
                        objectGlobal[`${pcTemp.fechaInicial}`] =  
                        {
                          marked:true,
                          selected:false,
                          dots:[pc]
                        } 
                      }
                    }
                    y++
                  }
               }
             }

             if(response.data.c.length >0)
             {
                //Recorrido para c
                for (let index3 = 0; index3 < response.data.c.length; index3++) 
                {
                  let y = 1 //variable que aumenta
                  let x = 0; //variable para validar
                  const cTemp = response.data.c[index3];
                  //console.log(cTemp)
                  let newDate =  cTemp.created_at.toString(); //substring(0,10);
                  let dateAComparar = newDate.substring(0,10);
                
                  console.log(dateAComparar)
                
                  for(let clave in objectGlobal)
                  {
                    if(clave === dateAComparar)
                    {
                      console.log(clave)
                      objectGlobal[clave].dots.push({color:'#56D0C1'})
                      x = 1 ;
                    }
                    else
                    {
                      if (index3 === (response.data.c.length-1) && x===0 && y === Object.keys(objectGlobal).length)
                      {
                        objectGlobal[`${dateAComparar}`] =  
                        {
                          marked:true,
                          selected:false,
                          dots:[c]
                        } 
                      } 
                    }
                    y++
                   }
                 }
             }

             /*
            
             
             if(response.data.pc.length > 0)
             {
                  //Recorrido pc
                for (let index2 = 0; index2 < response.data.pc.length; index2++) 
                {
                  let y = 1 //variable que aumenta
                  let x = 0; //variable para validar
                  const pcTemp = response.data.pc[index2];
                  for(let fecha in objectGlobal)
                  {
                    if(fecha === pcTemp.fechaInicial)
                    {
                      objectGlobal[fecha].dots.push(pc)
                      x = 1 ;
                    }
                    else
                    {
                      if (index2 === (response.data.pc.length-1) && x===0 && y === Object.keys(objectGlobal).length)
                      {
                        objectGlobal[`${pcTemp.fechaInicial}`] =  
                        {
                          marked:true,
                          selected:false,
                          dots:[pc]
                        } 
                      }
                    }
                    y++
                  }
                  
                }
             }
             */

             /*
             if(response.data.c.length > 0 )
             {
                //Recorrido para c
                 for (let index3 = 0; index3 < response.data.c.length; index3++) 
                 {
                   let y = 1 //variable que aumenta
                   let x = 0; //variable para validar
                   const cTemp = response.data.c[index3];
                   //console.log(cTemp)
                   let newDate =  cTemp.created_at.toString(); //substring(0,10);
                   let dateAComparar = newDate.substring(0,10);
                 
                   //console.log(dateAComparar)
                 
                   for(let clave in objectGlobal)
                   {
                     if(clave === dateAComparar)
                     {
                       objectGlobal[clave].dots.push({color:'#56D0C1'})
                       x = 1 ;
                     }
                     else
                     {
                       if (index3 === (response.data.c.length-1) && x===0 && y === Object.keys(objectGlobal).length)
                       {
                         objectGlobal[`${dateAComparar}`] =  
                         {
                           marked:true,
                           selected:false,
                           dots:[c]
                         } 
                       }  
                     }
                     y++
                   }
                 
                 }
             }
             */

          }
          //Seteo de datos
          console.log(objectGlobal)
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
         consultarInforInicio()
         consultarPorMes()
    },[lineaNegocio])

    useEffect(() => 
    {
      consultarInforInicio()
      consultarPorMes()
    },[cliente])

    //useEffect para cambios y consulta de fechas
    useEffect(() => 
    {
      consultaCalendario(dateCalendar, lineaNegocio, cliente)
    },[dateCalendar,cliente,lineaNegocio])
    
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