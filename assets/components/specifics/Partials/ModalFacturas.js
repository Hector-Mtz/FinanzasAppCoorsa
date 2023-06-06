import React, {useEffect} from 'react'
import { View, Text, Modal, StyleSheet, Pressable, Image, FlatList } from 'react-native'
import { formatoMoney } from '../../../utils/conversiones'

const ModalFacturas = (
  modalFacturas,
  setModalFacturas,
  setItemAMostrar,
  id
) => {  
  return (
    <View>
      <Modal transparent
       visible={modalFacturas.modalFacturas}
       animationType="slide"
      >
          <View style={styles.contenedor}>
            <View style={styles.modalStyle}>
               <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10}}>
                  <View style={{flexDirection:'row', alignItems:'center'}} >
                      <Pressable style={{width:30, height:30, alignItems:'center', justifyContent:'center'}} onPress={() => {
                         //modalPorPagar.setModalPorpagar(false)
                         modalFacturas.setModalFacturas(false)
                      }}>
                        <Image style={{width:10, height:20}} source={require('../../../img/arrow_left.png')} />
                      </Pressable>
                      <Text style={{color:'black', fontSize:23, marginLeft:15}}>
                        Por pagar
                      </Text>
                  </View>
                  <Image source={require('../../../img/pago_icon.png')} />
               </View>
               <View style={{flexDirection:'row', marginTop:20}}>
                  <View style={styles.facturaConenedor}>
                     <Text style={styles.textFactura}>
                        # {modalFacturas.item.referencia} 
                     </Text>
                  </View>
                  <View style={{marginTop:0,  justifyContent:'space-between', marginHorizontal:30}}>
                     <Text style={{color:'black', fontSize:12}}>
                        Fecha de pago
                     </Text>
                     <View style={{flexDirection:'row', alignItems:'center'}}>
                       <Text style={styles.date} >{modalFacturas.item.fechaDePago.substring(8,10)}</Text>
                       <View style={styles.span}></View>
                       <Text style={styles.date} >{modalFacturas.item.fechaDePago.substring(5,7)}</Text>
                       <View style={styles.span}></View>
                       <Text style={styles.date} >{modalFacturas.item.fechaDePago.substring(0,4)}</Text>
                    </View>
                  </View>
               </View>
               <View style={{marginTop:10}}>
                  <Text style={{fontSize:17, color:'black'}}>Total</Text>
               </View>
               <View style={styles.contenedorTotal}>
                 <Text style={styles.textTotal} >$ {formatoMoney(modalFacturas.item.cantidad.toFixed(2))}</Text>
               </View>
               <View>
                  {
                    modalFacturas.item.ocs.lenght === 0 ?
                    <View>
                       <Text style={{color:'black', fontWeight:'900', fontSize:20}}>- No hay OCS -</Text> 
                    </View>
                    :
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
                        <FlatList 
                             scrollEnabled
                             data={modalFacturas.item.ocs}
                             keyExtractor={(item) => item.id }
                             renderItem={({item}) => 
                            {
                              return (
                               <View>
                                 <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <View>
                                        <Text style={styles.tableRow}># {item.nombre}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.tableRow}>$ {formatoMoney(item.cantidad.toFixed(2))}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.tableRow}>{item.created_at}</Text>
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

const styles = StyleSheet.create({
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
     facturaConenedor:
     {
        borderColor:'#1D96F1',
        borderWidth:1,
        borderRadius:6,
        padding:8,
     },
     textFactura:
     {
       color:'black',
       textAlign:'center',
       fontSize:25,
       textTransform:'uppercase'
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
    contenedorTotal: {
      backgroundColor:'#1D96F1',
      alignItems:'center',
      marginHorizontal:20,
      padding:10,
      borderRadius:10,
      marginTop:15
    },
    textTotal:
    {
      color:'white',
      fontWeight:'900',
      fontSize:25
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
      fontSize:12,
    }
})

export default ModalFacturas
