import React, {useState, useEffect} from 'react'
import { View,Text,FlatList } from 'react-native'
import Buscador from '../generals/Buscador'
import SwitchButtons from '../generals/SwitchButtons';
import { formatoMoney } from '../../utils/conversiones';
import DropDownClient from '../generals/DropDownClient';
import axios from 'axios';

const SectionDepositos = () => {
   //Variables de filtros
   const [busqueda, setBusqueda] = useState('');
   const [slide, setSlide] = useState(0); 
   //Variables a setear de info
   const [clientes, setClientes] = useState([]);
   const [totalDepositos, setTotalDepositos] = useState(0);

   const totales = async (search, status) => 
   { //http://127.0.0.1:8000/api/ingresosApi
    await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/ingresosApi',{
      params:
      {
        search:search,
        status:status
      }
    })
     .then(response => 
     {
         //console.log(response.data)
         setClientes(response.data.clientesIngresos)
         setTotalDepositos(response.data.totalIngresos.total)
     })
     .catch(err => {
         // Handle errors
         console.error(err);
     }); 
   }

   //Efects para aplicar filtros
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
                      <DropDownClient item={item} type='Depositos' />
                    )
                  }}
                 />
        </View>
        <View style={{marginTop:5, borderTopColor:'#C6C6C6', borderTopWidth:1}}>
           <Text style={{color:'#1D96F1', fontSize:17, marginTop:7, fontFamily:'Montserrat-Medium'}} >TOTAL</Text>
           <Text style={{color:'black', fontSize:35, fontWeight:'bold', fontFamily:'Montserrat-Medium'}}>
              $ {formatoMoney(totalDepositos.toFixed(2))}
           </Text>
        </View>
      </View>
   </View>
  )
}

export default SectionDepositos