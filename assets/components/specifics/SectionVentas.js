import React, {useState, useEffect} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Button,
    Pressable,
    Image,
    ScrollView,
    FlatList
} from 'react-native'
import Buscador from '../generals/Buscador'
import ButtonGeneric from '../generals/ButtonGeneric'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import DropdownSelect from 'react-native-input-select'
import SwitchButtons from '../generals/SwitchButtons'
import DropDownClient from '../generals/DropDownClient'
import axios from 'axios'
import { formatoMoney } from '../../utils/conversiones'


const SectionVentas = 
(
  show,
  lineasNegocio
) => {

   //Consulta
   const totales = async () => 
   {
      await axios.get('https://finanzas.coorsamexico.com/api/getTotalsItems')
      .then(response => {
          setClientes(response.data.clientes)
          setTotal(response.data.totalVentasStatus[0].total)
          //console.log(response.data.totalVentasStatus[0].total)
      })
      .catch(err => {
          // Handle errors
          console.error(err);
      });
   }
  //Seteo de clientes
  const [clientes, setClientes] = useState([{id:0, nombre:'DHL'}]);
  const [total, setTotal] = useState(0);

  useEffect(() => 
  {
    if(clientes.length <= 1)
    {
      totales()
    }
  },[])

  //Variables de filtros
  const [dateInicio, setDateInicio] = useState(new Date());
  const [dateInicioShow, setDateInicioShow] = useState('');
  const [dateFin, setDateFin] = useState(new Date());
  const [dateFinShow, setDateFinShow] = useState('');
  const [open, setOpen] = useState(false);
  const [lineaNegocio, setLinea] = useState('');

  useEffect(() => 
  {
    let newFechaInicio= moment(dateInicio).format('YYYY-MM-DD'); 
    setDateInicioShow(newFechaInicio)
    let newFechaFin = moment(dateFin).format('YYYY-MM-DD'); 
    setDateFinShow(newFechaFin)
  },[dateInicio, dateFin])


  return (
    <View style={styles.contenedor}>
    {
      show ? 
       <View>
         <View style={styles.header}>
           <View >
            <Buscador />
           </View>
         </View>
          <View style={{flexDirection:'row', marginTop:7}}>
          <View style={{marginHorizontal:10}}>
              <Text style={{color:'black', marginBottom:5}}>
                Inicio
              </Text>
                 <View style={{width:150}}>
                   <Pressable style={styles.buttonCalendar} onPress={() => setOpen(true)}>
                      <Text style={styles.fechaShow}>
                         {dateInicioShow}
                      </Text>
                      <Image style={{width:20, height:20, margin:5}} source={require('../../img/calendario_icon.png')} />
                   </Pressable>
                 </View>
              <DatePicker 
                 title={'Selecciona una fecha'}
                 date={dateInicio} 
                 modal 
                 mode="date"
                 open={open}     
                 onConfirm={(date) => {
                        setOpen(false)
                        setDateInicio(date)
                     }}
                  onCancel={() => {
                       setOpen(false)
                }} />
          </View>
          <View style={{marginHorizontal:10}}>
              <Text style={{color:'black', marginBottom:5}}>
                Fin
              </Text>
                 <View style={{width:150}}>
                   <Pressable style={styles.buttonCalendar} onPress={() => setOpen(true)}>
                      <Text style={styles.fechaShow}>
                         {dateFinShow}
                      </Text>
                      <Image style={{width:20, height:20, margin:5}} source={require('../../img/calendario_icon.png')} />
                   </Pressable>
                 </View>
              <DatePicker 
                 title={'Selecciona una fecha'}
                 date={dateFin} 
                 modal 
                 mode="date"
                 open={open}     
                 onConfirm={(date) => {
                        setOpen(false)
                        setDateFin(date)
                     }}
                  onCancel={() => {
                       setOpen(false)
                }} />
          </View>
          </View>
          <View style={{marginTop:10}}>
            <Text style={{color:'black', marginLeft:5, marginBottom:5}}>
              Linea de negocio
            </Text>
            <DropdownSelect   
                onValueChange={(itemValue) => setLinea(itemValue)}
                selectedValue={lineaNegocio}
                placeholder="TODAS"
                dropdownStyle={{
                  borderWidth: 0,
                  borderColor:'black',
                     
                }}
                checkboxStyle={{
                  backgroundColor: '#1D96F1',
                  borderRadius: 30, // To get a circle - add the checkboxSize and the padding size
                  padding: 5,
                  borderColor:'white'
                }}
                options={lineasNegocio.lineasNegocio}
                optionLabel={'name'}
                optionValue={'id'}
                checkboxLabelStyle={{ color: 'black', fontSize: 15 }}
                listHeaderComponent={
                  <View style={{alignItems:'center'}}>
                    <Text style={{color:'black', fontSize:20}} >
                      Lineas de negocio disponibles
                    </Text>
                   
                  </View>
                }  
                >
              </DropdownSelect>
          </View>
          <View>
            <SwitchButtons />
            <View style={{marginTop:10}}>
               <FlatList 
                 scrollEnabled
                 data={clientes}
                 keyExtractor={(item) => item.id }
                 renderItem={({item}) => 
                {
                  return (
                    <DropDownClient item={item}  />
                  )
                }}
               />
            </View>
            <View style={{marginTop:5, borderTopColor:'#C6C6C6', borderTopWidth:1}}>
              <Text style={{color:'#1D96F1', fontSize:17, marginTop:7}} >TOTAL</Text>
              <Text style={{color:'black', fontSize:35, fontWeight:'bold'}}>
                 $ {formatoMoney(total.toFixed(2))}
              </Text>
            </View>
          </View>
       </View>
      : null
    }
  </View>
  )
}

const styles = StyleSheet.create(
    {
       contenedor:
       {
         marginTop:15
       },
       header:
       {
        flexDirection:'row',
        justifyContent:'space-between',
       },
       buttonCalendar:
       {
         backgroundColor:'#F2F2F2',
         borderRadius:6,
         flexDirection:'row'
       },
       fechaShow:
       {
        marginHorizontal:20,
        marginTop:3,
        color:'#C3C3C3'
       }
    }
);

export default SectionVentas