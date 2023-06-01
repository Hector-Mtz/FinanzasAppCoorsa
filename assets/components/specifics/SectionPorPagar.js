import React, {useState, useEffect} from 'react'
import {Text, View, FlatList} from 'react-native'
import Buscador from '../generals/Buscador';
import SwitchButtons from '../generals/SwitchButtons'
import { formatoMoney } from '../../utils/conversiones';
import axios from 'axios';
import DropDownClient from '../generals/DropDownClient';

const SectionPorPagar = () => {
  //Variables de filtros
  const [busqueda, setBusqueda] = useState('');
  const [slide, setSlide] = useState(0); 
  //Variables a pintar
  const [clientes, setClientes] = useState([]);
  const [totalFacturas, setTotalFacturas] = useState(0);
    //Consulta
  const totales = async (search, status) => 
  {
     await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/facturasApi',{
      params:{
        search:search,
        status:status
      }
     })
     .then(response => {
         //console.log(response.data)
         setTotalFacturas(response.data.totalFacturas.total)
         setClientes(response.data.clientesFacturas)
     })
     .catch(err => {
         // Handle errors
         console.error(err);
     });
  }


  useEffect(() => 
  {
     totales(busqueda, slide)
  },[busqueda, slide])

  return (
    <View>
        <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center'}} >
            <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
         </View>
         <View style={{marginTop:20}}>
            <View style={{alignSelf:'center', justifyContent:'center', alignContent:'center'}}>
              <SwitchButtons slide={slide} setSlide={setSlide}  />
            </View>
            <View style={{marginTop:20}}>
               <FlatList 
                   scrollEnabled
                   data={clientes}
                   keyExtractor={(item) => item.id }
                   renderItem={({item}) =>             
                  {
                    return (
                      <DropDownClient item={item} type='Facturas' />
                    )
                  }}
                 />
            </View>
            <View style={{marginTop:5, borderTopColor:'#C6C6C6', borderTopWidth:1}}>
              <Text style={{color:'#1D96F1', fontSize:17, marginTop:7}} >TOTAL</Text>
              <Text style={{color:'black', fontSize:35, fontWeight:'bold'}}>
                 $ {formatoMoney(totalFacturas.toFixed(2))}
              </Text>
            </View>
         </View>
    </View>
  )
}

export default SectionPorPagar