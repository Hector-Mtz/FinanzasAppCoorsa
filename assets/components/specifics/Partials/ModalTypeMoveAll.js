import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { View, Modal, StyleSheet, Text, Pressable, Image, Animated } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';

const ModalTypeMoveAll = (
    modalItem,
    setModalItem,
    title,
    dia
) => {
    //console.log(modalItem)
    const [items, setItems] = useState([]);
    //Variables de animacion
    const [show, setShow] = useState(false); //variable para el slide
    const [animacion] = useState(new Animated.Value(0)) 
    //Esto es para consultar los datos dependiendo que piquemos
    useEffect(() => 
    { 
      if(modalItem.modalItem)
      {
         switch (modalItem.title) 
         {
            case 'Ventas':
                  let rutaAConsultar = 'https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/ventasByDay';
                  consultarItemsByDay(modalItem.dia, rutaAConsultar)
                break;
         }
      }
      else
      {
         setItems([]);
      }
    },[modalItem.modalItem])

    const consultarItemsByDay = async (dia, route) => 
    {
       axios.get(route,{
        params:
        {
            dia:dia
        }
       }).then(response => 
        {
            //console.log(response)
            setItems(response.data)
        }
       )
    }

    //Effect de animacion
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

  return (
    <View>
      <Modal
      transparent
      visible={modalItem.modalItem}
      animationType="slide">
          <View style={styles.contenedor}>
            <View style={styles.modalStyle}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10}}>
                      <View  style={{flexDirection:'row', alignItems:'center'}}>
                          <Pressable onPress={() => 
                          {
                              modalItem.setModalItem(false)
                          }}>
                              <Image style={{width:10, height:20}} source={require('../../../img/arrow_left.png')} />
                          </Pressable>
                          <Text style={{color:'black', fontSize:23, marginLeft:15}}>
                              {modalItem.title}
                          </Text>
                      </View>
                      <Image source={require('../../../img/monedas_icon.png')} />
                  </View>
                  <View>
                    {
                        modalItem.title == 'Ventas' ?
                        <View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', marginTop:10}}>
                                <Text style={styles.date} >{(modalItem.dia).substring(8,10)}</Text>
                                <View style={styles.span}></View>
                                <Text style={styles.date} >{(modalItem.dia).substring(5,7)}</Text>
                                <View style={styles.span}></View>
                                <Text style={styles.date} >{(modalItem.dia).substring(0,4)}</Text>
                                <View style={styles.span}></View>
                            </View>
                            <View style={{marginTop:10}} >
                                <View style={{flexDirection:'row',borderBottomColor:'#1D96F1', borderBottomWidth:1, justifyContent:'space-between'}} >
                                    <View>
                                        <Text style={styles.th}>Nombre</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.th}>Total</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.th}>Pagado</Text>
                                    </View>
                                    <View>

                                    </View>
                                </View>
                            </View>
                            <View>
                                <FlatList 
                                  data={items}
                                  keyExtractor={(item) => item.id }
                                  renderItem={({item}) => 
                                  {
                                    return (
                                     <View>
                                       <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>
                                          <View style={{marginHorizontal:0, marginRight:0}}>
                                              <Text style={styles.tableRow}> {item.nombre} </Text>
                                          </View>
                                          <View>
                                              <Text style={styles.tableRow}>hola </Text>
                                          </View>
                                          <View>
                                              <Text style={styles.tableRow}>hola</Text>
                                          </View>
                                          <View>
                                             <Pressable  style={styles.buttonWatch}>
                                                <Image source={require('../../../img/eye.png')} />
                                             </Pressable>
                                             <Pressable onPress={() => 
                                            {
                                                setShow(!show)
                                            }} style={styles.buttonSlide}>
                                                <Image style={{height:12}} source={require('../../../img/down_arrow.png')} />
                                             </Pressable>
                                          </View>
                                       </View>
                                       <Animated.View style={{height:animacion}}>
                                             <Text>Hola mundo</Text>
                                        </Animated.View>
                                     </View>   
                                    )
                                  }}
                                />
                            </View>
                        </View>
                        :null
                    }
                  </View>
              </View>
          </View>
      </Modal>
    </View>
  )
}

const styles =  StyleSheet.create(
    {
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
          th:
          {
            color:'black',
            textTransform:'uppercase',
            marginBottom:5,
            letterSpacing:1,
            fontWeight:'300'
          },
          tableRow:
          {
            color:'black', 
            fontSize:10,
          },
          buttonWatch:
          {
            backgroundColor:'#697FEA',
            width:40,
            paddingVertical:3,
            paddingHorizontal:6,
            borderRadius:12,
            alignItems:'center'
          },
          buttonSlide:
          {
            backgroundColor:'#1D96F1',
            width:40,
            paddingVertical:3,
            paddingHorizontal:6,
            borderRadius:12,
            alignItems:'center',
            marginTop:8
          }
    }
);

export default ModalTypeMoveAll
