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
  show
) => {

    //Variables de filtros
    const [dateInicio, setDateInicio] = useState(new Date());
    const [dateInicioShow, setDateInicioShow] = useState(''); //se va para consulta
    const [dateFin, setDateFin] = useState(new Date());
    const [dateFinShow, setDateFinShow] = useState(''); //se va para consulta
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [lineaNegocio, setLinea] = useState(''); //se va para consulta
    const [busqueda, setBusqueda] = useState('');
    const [slide, setSlide] = useState(0);  //se va para consulta

      //Seteo de clientes
    const [clientes, setClientes] = useState([{id:0, nombre:'DHL'}]);
    const [total, setTotal] = useState(0);
    const [lineasNegocio, setLineasNegocio] = useState([{id:0, name:'TODAS'}]);

   //Consulta
   const totales = async (busqueda, fechaInicio, fechaFinal, lineaNegocio, status) => 
   {
      //console.log([busqueda, fechaInicio, fechaFinal, lineaNegocio, status])
      await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/getTotalsItems')
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

   useEffect(() => 
   {
      totales(busqueda, dateInicioShow, dateFinShow, lineaNegocio, slide)
   },[busqueda, dateInicioShow, dateFinShow,lineaNegocio, slide ])


   //Peticiones
   useEffect(() =>  //al menos tiene que ejecutarse una vez
   {
     const lineasNegocioConsulta = async () => 
     {
        await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/getLineasNegocio')
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
    let newFechaInicio = moment(dateInicio).format('YYYY-MM-DD'); 
    setDateInicioShow(newFechaInicio)
    let newFechaFin = moment(dateFin).format('YYYY-MM-DD'); 
    setDateFinShow(newFechaFin)
  },[dateInicio, dateFin])

 

  return (
    <View style={styles.contenedor}>
    {
      show ? 
       <View>
         <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center'}} >
            <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
         </View>
          <View style={{flexDirection:'row', marginTop:7, alignSelf:'center'}}>
          <View style={{marginHorizontal:5}}>
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
          <View style={{marginHorizontal:5}}>
              <Text style={{color:'black', marginBottom:5}}>
                Fin
              </Text>
                 <View style={{width:150}}>
                   <Pressable style={styles.buttonCalendar} onPress={() => setOpen2(true)}>
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
                 open={open2}     
                 onConfirm={(date) => {
                        setOpen2(false)
                        setDateFin(date)
                     }}
                  onCancel={() => {
                       setOpen2(false)
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
                placeholder=""
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
                options={lineasNegocio}
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
            <View style={{alignSelf:'center', justifyContent:'center', alignContent:'center'}}>
              <SwitchButtons slide={slide} setSlide={setSlide} />
            </View>
            <View style={{marginTop:20}}>
               <FlatList 
                 scrollEnabled
                 data={clientes}
                 keyExtractor={(item) => item.id }
                 renderItem={({item}) => 
                 
                {
                  return (
                    <DropDownClient item={item} type={'Ventas'} />
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