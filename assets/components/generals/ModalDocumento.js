import React from 'react'
import {View,Text, Modal, StyleSheet, Pressable, Image} from 'react-native'
import ViewDocument from '../generals/ViewDocument'

const ModalDocumento = (
    modalDocs,
    setModalDocs,
    documento
) => {
    //console.log(modalDocs)
  return (
   <View>
     <Modal
     transparent
      visible={modalDocs.modalDocs}
      animationType="slide">
        <View style={styles.contenedor}>
            <View style={styles.modalStyle}>
                <View  style={{flexDirection:'row', alignItems:'center'}}>
                      <Pressable style={{width:30, height:30, alignItems:'center', justifyContent:'center'}} onPress={() => 
                      {
                        modalDocs.setModalDocs(false)
                      }}>
                          <Image style={{width:10, height:20}} source={require('../../img/arrow_left.png')} />
                      </Pressable>
                      <Text style={{color:'black', fontSize:23, marginLeft:15}}>
                          Documento
                      </Text>
               </View>
               <View style={{marginTop:5}}>
                  <ViewDocument documento={modalDocs.documento} />
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
})

export default ModalDocumento
