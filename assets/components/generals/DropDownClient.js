import React, { useState, useEffect } from 'react'
import { Pressable, View, Text, StyleSheet, Image, Animated,FlatList, ActivityIndicator } from 'react-native'
import axios from 'axios'
import ButtonWatch from './ButtonWatch';
import ModalVentasPorPagar from './ModalVentasPorPagar';
import ModalFacturas from '../specifics/Partials/ModalFacturas';
import { formatoMoney } from '../../utils/conversiones';
import ModalDepositos from '../specifics/Partials/ModalDepositos';
const DropDownClient = (
  item,
  type
) =>
 {
  let nombre = item.item.nombre;
  let total = 0;
  const [itemType, setItemType] = useState(item.type);
  if(item.type == 'Ventas')
  {
    total =  item.item.total_ventas
  }
  if(item.type == 'Facturas')
  {
    //console.log(item.item.total_facturas)
    total = item.item.total_facturas
  }
  if(item.type == 'Depositos')
  {
     total = item.item.total_ingresos
  }

  let id = item.item.id;
  const [show, setShow] = useState(false);
  const [ventas, setVentas] = useState(null); //variable para almacenar las ventas
  const [facturas, setFacturas] = useState(null);
  const [depositos, setDepositos] = useState(null); //debe ser seteado en null
  const [animacion] = useState(new Animated.Value(0)) 

  useEffect(() => 
  {
    //console.log(show)
     if(show) //mostramos
     {
       Animated.timing(
        animacion,{
            toValue:250,
            duration:100,
            useNativeDriver:false
        }
       ).start()
     }
     if(!show) //ocultamos
     {
       Animated.timing(
        animacion, {
            toValue:0,
            duration:100,
            useNativeDriver:false
        }
       ).start()
     } 
 },[show])

  const [showIndicator,setShowIndicator] = useState(false) 
  const desplegar = async (id) => 
  {
    console.log(id)
    setShowIndicator(true)
    setShow(!show)
    //Si son ventas
    if(item.type == 'Ventas')
    {
        await axios.get("https://finanzas.coorsamexico.com/api/ventasByClienteApi/"+ id,
        {
          params:{} //aqui van los parametros como linea de negocio, etc para filtrar
        })
        .then(response => {
            // Handle response
            //console.log(response.data);
            setVentas(response.data)
            setShowIndicator(false)
        })
        .catch(err => {
            // Handle errors
            console.error(err);
        });
    }
    //Si son facturas
    if(item.type == 'Facturas')
    {
      //console.log(id)
      await axios.get("https://finanzas.coorsamexico.com/api/facturasByClienteApi",
      {
        params:{
          cliente_id:id
        } //aqui van los parametros como linea de negocio, etc para filtrar
      })
      .then(response => {
          // Handle response
          //console.log(response.data);
          if(facturas == null )
          {
            setFacturas(response.data)
            setShowIndicator(false)
          }
          else
          {
            setFacturas(null)
          }
      })
      .catch(err => {
          // Handle errors)
          console.error(err);
      });
    }

    if(item.type == 'Depositos')
    {
      await axios.get("http://127.0.0.1:8000/api/ingresoByClienteApi",
      {
        params:{
          cliente_id:id
        } //aqui van los parametros como linea de negocio, etc para filtrar
      })
      .then(response => {
          // Handle response
          //console.log(response.data);
          if(facturas == null )
          {
            setDepositos(response.data)
            setShowIndicator(false)
          }
          else
          {
            setDepositos(null)
          }
      })
      .catch(err => {
          // Handle errors)
          console.error(err);
      });
    }
  }

  const changePage = async (route) => 
  {
    //console.log(route)
    await axios.get(route,
    {
      params:{} //aqui van los parametros como linea de negocio, etc para filtrar
    })
    .then(response => {
        // Handle response
        //console.log(response.data);
        if(item.type == 'Ventas')
        {
          setVentas(response.data)
        }
        if(item.type == 'Facturas')
        {
           setFacturas(response.data)
        }
        if(item.type == 'Depositos')
        {
            setDepositos(response.data)
        }
    })
    .catch(err => {
        // Handle errors
        console.error(err);
    });
  }

  //Variables para los modales
  const [modalPorPagar, setModalPorpagar] = useState(false);
  const [modalFacturas, setModalFacturas] = useState(false);
  const [modalDepositos, setModalDepositos] = useState(false);
  const [ItemAMostrar, setItemAMostrar] = useState(0);

  return (
    <View >
        <View style={style.contenedor}>
          <Text style={style.text}>{nombre}</Text>
          <Pressable style={style.buttonDesplegable} onPress={() => {desplegar(id)}}>
              <Text style={style.textButton}>
                  {total}
              </Text>
              <Image style={style.downArrow} source={require('../../img/down_arrow.png')} />
          </Pressable>
      </View>
      <Animated.View style={{height:animacion}}>
        {
          show ? 
            <View>
              {
                showIndicator ?
                  <ActivityIndicator />
                : null
              }
              {
                item.type == 'Ventas' ?
                <View>
                  {
                   ventas !== null ?        
                   <View>
                     <FlatList 
                       scrollEnabled
                       data={ventas.data}
                       keyExtractor={(item) => item.id }
                       renderItem={({item}) => 
                      {
                        return (
                         <View style={style.contenedorItemClient}>
                              <Text style={{color:'black'}}>
                               {item.ceco + ' - ' + item.servicio}
                               </Text>
                              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                 <Text style={{color:'black'}}>{item.fechaInicial}</Text>
                                 <ButtonWatch itemType={itemType} modalPorPagar={modalPorPagar} setModalPorpagar={setModalPorpagar} setItemAMostrar={setItemAMostrar} id={item.id} />
                              </View>
                              {
                                ItemAMostrar === item.id ?
                                  <ModalVentasPorPagar modalPorPagar={modalPorPagar} setModalPorpagar={setModalPorpagar} item={item} />
                                  : null
                              }
                         </View>   
                        )
                      }}
                  />
                     <View style={{flexDirection:'row'}}>
                         <View style={{flexDirection:'row', alignItems:'center'}}>
                           {
                             ventas.current_page == 1 ?
                              <View style={{flexDirection:'row', alignItems:'center'}}>
                                <View style = {{ marginHorizontal:6}} >
                                 <Image style={[style.arrow, {opacity:0.5}]} source={require('../../img/double_arrow_left_gray.png')} />
                               </View>
                               <View>
                                   <Image style={[style.arrow, {opacity:0.5}]} source={require('../../img/arrow_gray.png')} />
                               </View>
                              </View>
                             :
                              <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Pressable style = {{ marginHorizontal:6}}  onPress={() => {
                                   changePage(ventas.first_page_url)
                                }}>
                                 <Image style={style.arrow} source={require('../../img/double_arrow_left_gray.png')} />
                               </Pressable>
                                <Pressable onPress={() => {
                                   changePage(ventas.prev_page_url)
                                  }} >
                                    <Image style={style.arrow} source={require('../../img/arrow_gray.png')} />
                                </Pressable>
                              </View>
                           }
                         </View>
                         <View style={{width:25, alignItems:'center', borderWidth:0.5 , borderColor:'#C3C3C3', marginHorizontal:5}}>
                           <Text style={{color:'black'}} >{JSON.stringify(ventas.current_page)}</Text>
                         </View>
                          <Text style={{color:'black'}}>
                              de 
                              <Text> {ventas.last_page}</Text>
                           </Text>
                         <View style={{flexDirection:'row', alignItems:'center' }}>
                            <Pressable style = {{ marginHorizontal:6}}  onPress={() => {
                               changePage(ventas.next_page_url)
                            }}>
                               <Image  style={style.arrow}  source={require('../../img/arrow_right_gray.png')} />
                            </Pressable>
                            <Pressable onPress={() => {
                               changePage(ventas.last_page_url)
                             }}>
                               <Image style={style.arrow} source={require('../../img/double_arrow_right_gray.png')} />
                            </Pressable>
                         </View>
                     </View>
                   </View>
                   :
                   <View>
                      <Text>No hay registros</Text>
                   </View>
               }
                </View>
                : null
              }
              {
                item.type == 'Facturas' ? 
                <View>
                   {
                    facturas !== null ?
                    <View>
                      <FlatList 
                      scrollEnabled
                      data={facturas.data}
                      keyExtractor={(item) => item.id }
                      renderItem={({item}) => 
                      {
                        return (
                         <View style={style.contenedorItemClient}>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                              <Text style={{color:'black',textTransform:'uppercase'}} >#{item.referencia}</Text>
                              <ButtonWatch itemType={itemType} modalPorPagar={modalPorPagar}  setModalFacturas={setModalFacturas} setItemAMostrar={setItemAMostrar} id={item.id} />
                            </View>
                            {
                               ItemAMostrar === item.id ?
                                 <ModalFacturas modalFacturas={modalFacturas} setModalFacturas={setModalFacturas} item={item} />
                              : null
                            }
                         </View>   
                        )
                      }}
                      />
                      <View style={{flexDirection:'row'}}>
                         <View style={{flexDirection:'row', alignItems:'center'}}>
                           {
                             facturas.current_page == 1 ?
                              <View style={{flexDirection:'row', alignItems:'center'}}>
                                <View style = {{ marginHorizontal:6}} >
                                 <Image style={[style.arrow, {opacity:0.5}]} source={require('../../img/double_arrow_left_gray.png')} />
                               </View>
                               <View>
                                   <Image style={[style.arrow, {opacity:0.5}]} source={require('../../img/arrow_gray.png')} />
                               </View>
                              </View>
                             :
                              <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Pressable style = {{ marginHorizontal:6}}  onPress={() => {
                                   changePage(facturas.first_page_url)
                                }}>
                                 <Image style={style.arrow} source={require('../../img/double_arrow_left_gray.png')} />
                               </Pressable>
                                <Pressable onPress={() => {
                                   changePage(facturas.prev_page_url)
                                  }} >
                                    <Image style={style.arrow} source={require('../../img/arrow_gray.png')} />
                                </Pressable>
                              </View>
                           }
                         </View>
                         <View style={{width:25, alignItems:'center', borderWidth:0.5 , borderColor:'#C3C3C3', marginHorizontal:5}}>
                           <Text style={{color:'black'}} >{JSON.stringify(facturas.current_page)}</Text>
                         </View>
                          <Text style={{color:'black'}}>
                              de 
                              <Text> {facturas.last_page}</Text>
                           </Text>
                         <View style={{flexDirection:'row', alignItems:'center' }}>
                            <Pressable style = {{ marginHorizontal:6}}  onPress={() => {
                               changePage(facturas.next_page_url)
                            }}>
                               <Image  style={style.arrow}  source={require('../../img/arrow_right_gray.png')} />
                            </Pressable>
                            <Pressable onPress={() => {
                               changePage(facturas.last_page_url)
                             }}>
                               <Image style={style.arrow} source={require('../../img/double_arrow_right_gray.png')} />
                            </Pressable>
                         </View>
                      </View>
                    </View>
                    :
                    <View>
                      <Text>No hay facturas por mostrar</Text>
                    </View>
                   }
                </View>
                : null
              }
              {
                 item.type == 'Depositos' ?
                 <View>
                   {
                     depositos !== null ?
                     <View>
                           <FlatList 
                            scrollEnabled
                            data={depositos.data}
                            keyExtractor={(item) => item.id }
                            renderItem={({item}) => 
                           {
                             return (
                              <View style={style.contenedorItemClient}>
                                  <Text style={{color:'black'}}>
                                    #{item.nombre}
                                   </Text>
                                   <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:6}}> 
                                      <Text style={{color:'black'}}>Cantidad: ${formatoMoney(item.cantidad.toFixed(2))}</Text>
                                      <View>
                                        <ButtonWatch itemType={itemType} modalPorPagar={modalPorPagar} setModalDepositos={setModalDepositos} setItemAMostrar={setItemAMostrar} id={item.id} />
                                      </View>
                                      {
                                        ItemAMostrar === item.id ?
                                        <View>
                                            <ModalDepositos modalDepositos={modalDepositos} setModalDepositos={setModalDepositos} item={item} />
                                        </View>
                                        : null
                                      }
                                   </View>
                              </View>   
                             )
                           }}
                        />               
                        <View style={{flexDirection:'row'}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                              {
                                depositos.current_page == 1 ?
                                 <View style={{flexDirection:'row', alignItems:'center'}}>
                                   <View style = {{ marginHorizontal:6}} >
                                    <Image style={[style.arrow, {opacity:0.5}]} source={require('../../img/double_arrow_left_gray.png')} />
                                  </View>
                                  <View>
                                      <Image style={[style.arrow, {opacity:0.5}]} source={require('../../img/arrow_gray.png')} />
                                  </View>
                                 </View>
                                :
                                 <View style={{flexDirection:'row', alignItems:'center'}}>
                                   <Pressable style = {{ marginHorizontal:6}}  onPress={() => {
                                      changePage(depositos.first_page_url)
                                   }}>
                                    <Image style={style.arrow} source={require('../../img/double_arrow_left_gray.png')} />
                                  </Pressable>
                                   <Pressable onPress={() => {
                                      changePage(depositos.prev_page_url)
                                     }} >
                                       <Image style={style.arrow} source={require('../../img/arrow_gray.png')} />
                                   </Pressable>
                                 </View>
                              }
                            </View>
                            <View style={{width:25, alignItems:'center', borderWidth:0.5 , borderColor:'#C3C3C3', marginHorizontal:5}}>
                              <Text style={{color:'black'}} >{JSON.stringify(depositos.current_page)}</Text>
                            </View>
                             <Text style={{color:'black'}}>
                                 de 
                                 <Text> {depositos.last_page}</Text>
                              </Text>
                            <View style={{flexDirection:'row', alignItems:'center' }}>
                               <Pressable style = {{ marginHorizontal:6}}  onPress={() => {
                                  changePage(depositos.next_page_url)
                               }}>
                                  <Image  style={style.arrow}  source={require('../../img/arrow_right_gray.png')} />
                               </Pressable>
                               <Pressable onPress={() => {
                                  changePage(depositos.last_page_url)
                                }}>
                                  <Image style={style.arrow} source={require('../../img/double_arrow_right_gray.png')} />
                               </Pressable>
                            </View>
                        </View>
                     </View>
                     :
                     <View>
                       <Text>No hay registros</Text>
                     </View>
                   }
                 </View>
                 :
                 null
              }
            </View>
          :null
        }
      </Animated.View>
    </View>
  )
}

const style = StyleSheet.create({
    contenedor:
    {
      flexDirection:'row',
      justifyContent:'space-between',
      marginVertical:2
    },
    text:
    {
      color:'black',
      textTransform:'uppercase',
      letterSpacing:1,
      fontSize:11,

    },
    buttonDesplegable:
    {
      backgroundColor:'#1D96F1',
      paddingHorizontal:18,
      paddingVertical:2,
      borderRadius:15,
      flexDirection:'row',
      alignItems:'center'
    },
    textButton:
    {
        color:'white',
        fontSize:12,
        //fontWeight:'bold'
    },
    downArrow:
    {
        marginLeft:15
    },
    contenedorItemClient:
    {
       backgroundColor:'#F2F2F2',
       borderRadius:5,
       padding:5,
       margin:5
    },
    arrow:
    {
      width:16,
      height:16,
    }
})
export default DropDownClient