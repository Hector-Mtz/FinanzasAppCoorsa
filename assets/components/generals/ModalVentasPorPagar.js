import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {View, Text, Modal, Image, StyleSheet, Pressable, FlatList} from 'react-native'
import { formatoMoney } from '../../utils/conversiones';
const ModalVentasPorPagar = (
    modalPorPagar,
    setModalPorpagar,
    item
) => {
    const venta = modalPorPagar.item;
    const [ocs, setOcs] = useState([]);

    //Totales con iva y total
    const [iva,setIva] = useState(0);
    const [total,setTotal] = useState(0);

    useEffect(() => 
    {
      if(modalPorPagar.modalPorPagar == true)
      {
         consultarFacturaOcs(modalPorPagar.item.id) //mandamos el id de la venta actual
         //Calculos de totales y del iva
        // console.log(venta)
         if(venta.iva) //si tiene iva se calcula
         {
           setTotal(venta.monto + venta.monto * 0.16)
           setIva(venta.monto * 0.16)
         }
         else
         {
            setTotal(venta.monto)
            setIva(0)
         }
        
      }
    },[modalPorPagar.modalPorPagar]);

    const consultarFacturaOcs = async (id) => 
    {
        await axios.get("https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/facturaVenta",
        {
          params:{
            venta_id:id
          } //aqui van los parametros como linea de negocio, etc para filtrar
        })
        .then(response => {
            // Handle response
            console.log(response.data);
            setOcs(response.data)
        })
        .catch(err => {
            // Handle errors
            console.error(err);
        });
    }

  return (
    <View>
      <Modal transparent
      visible={modalPorPagar.modalPorPagar}
      animationType="slide"
      >
          <View style={styles.contenedor}>
            <View style={styles.modalStyle}>
               <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10}}>
                  <View style={{flexDirection:'row', alignItems:'center'}} >
                      <Pressable onPress={() => {
                         modalPorPagar.setModalPorpagar(false)
                      }}>
                        <Image style={{width:10, height:20}} source={require('../../img/arrow_left.png')} />
                      </Pressable>
                      <Text style={{color:'black', fontSize:23, marginLeft:15}}>Por pagar</Text>
                  </View>
                  <Image source={require('../../img/monedas_icon.png')} />
               </View>
               <View style={{marginTop:15, flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={{color:'black', fontSize:12}}>
                     Fecha inicial
                  </Text>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                     <Text style={styles.date} >{venta.fechaInicial.substring(8,10)}</Text>
                     <View style={styles.span}></View>
                     <Text style={styles.date} >{venta.fechaInicial.substring(5,7)}</Text>
                     <View style={styles.span}></View>
                     <Text style={styles.date} >{venta.fechaInicial.substring(0,4)}</Text>
                  </View>
               </View>
               <View style={styles.contenedorCantidades}>
                 <View style={[{marginLeft:10, marginRight:35}]}>
                    <Text>Subtotal</Text>
                    <View style={styles.contenedorCantidad}>
                        <Text style={styles.textCantidad}>$ {formatoMoney((venta.monto.toFixed(2)))}</Text>
                    </View>
                 </View>
                 <View >
                    <Text>IVA</Text>
                    <View style={styles.contenedorCantidad}>
                        <Text style={styles.textCantidad}>$ {formatoMoney(iva.toFixed(2))}</Text>
                    </View>
                 </View>
               </View>
               <View style={{marginTop:15}}>
                  <Text>Total</Text>
                  <View style={styles.contenedorTotal}>
                     <Text style={styles.totalText} >$ {formatoMoney(total.toFixed(2))}</Text>
                  </View>
               </View>
               <View style={styles.contenedorOcs}>
                  {
                    ocs.length === 0 ?
                    <View>
                       <Text style={{color:'black', fontWeight:'900', fontSize:20}}>- No hay OCS -</Text> 
                    </View>
                    :
                    <View>
                          <FlatList 
                             scrollEnabled
                             data={ocs}
                             keyExtractor={(item) => item.id }
                             renderItem={({item}) => 
                            {
                              return (
                               <View>
                                 <View style={{borderBottomWidth:1, borderBottomColor:'#1D96F1', flexDirection:'row', justifyContent:'space-between'}}>
                                    <View>
                                        <Text style={styles.tableHeader}>OC</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.tableHeader}>Cantidad</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.tableHeader}>Fecha</Text>
                                    </View>
                                 </View>
                                 <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <View>
                                        <Text style={styles.tableRow}># {item.nombre}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.tableRow}>$ {formatoMoney(item.cantidad.toFixed(2))}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.tableRow}>{item.fecha_alta}</Text>
                                    </View>
                                 </View>
                               </View>   
                              )
                            }}
                        />
                    </View>
                  }
               </View>
            </View>
          </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create( {
  contenedor:{
     flex:1,
     justifyContent:'center'
  },
  modalStyle:
  {
    backgroundColor:'white',
    shadowColor:'#000',
    shadowOffset:{
        width:0,
        height:2
    },
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:2,
    marginHorizontal:15, 
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    padding:15,
    flex:1,
    marginTop:50
  },
  date:
  {
    color:'black',
    fontSize:18
  },
  span:{
    backgroundColor:'#1D96F1',
    height:18,
    width:3,
    marginHorizontal:10
  },
  contenedorCantidades:
  {
    flexDirection:'row',
    marginTop:15
  },
  contenedorCantidad:
  {
     borderWidth:1.5,
     borderRadius:5,
     padding:6,
     borderColor:'#1D96F1',
     paddingHorizontal:5,
     marginTop:8
  },
  textCantidad:
  {
    color:'black',
    fontSize:20
  },
  contenedorTotal:
  {
    backgroundColor:'#1D96F1',
    alignItems:'center',
    marginHorizontal:20,
    padding:10,
    borderRadius:10,
    marginTop:15
  },
  totalText:
  {
    color:'white',
    fontWeight:'900',
    fontSize:20
  },
  contenedorOcs:
  {
    marginTop:30
  },
  tableHeader:{
    color:'black', 
    letterSpacing:2,
    textTransform:'uppercase',
    textAlign:'center'
  },
  tableRow:
  {
    color:'black', 
    fontSize:12
  }
});

export default ModalVentasPorPagar