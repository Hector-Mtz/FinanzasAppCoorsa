import React,{useState, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    Animated
  } from 'react-native'
import CalendarTotals from '../specifics/CalendarTotals';
import SectionVentas from '../specifics/SectionVentas';
import SectionPorPagar from '../specifics/SectionPorPagar';

const DropDownItem = (
    {
        title,
        icon,
        dataCalendar,
        setDateCalendar,
        lineasNegocio
    }
) => {

  //Animacion para mostrar
  let [show, setShow] = useState(false);
  const [animacion] = useState(new Animated.Value(0)) 

  useEffect(() => 
  {
    //console.log(show)
     if(show) //mostramos
     {
       Animated.timing(
        animacion,{
            toValue:1000,
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
    <Pressable style={styles.contenedor} onPress={() => {setShow(!show)}}>
      <View style={styles.headerCard}>
         <Text style={styles.titulo}>
            {title} 
         </Text>
        {icon === 'calendar' ? 
         <Image source={require('../../img/calendario_icon.png')} />
         :
         null
        }
        {icon === 'deposito' ? 
         <Image source={require('../../img/icon_deposito.png')} />
         :
         null
        }
        {icon === 'monedas' ? 
         <Image source={require('../../img/monedas_icon.png')} />
         :
         null
        }
        {icon === 'pago' ? 
         <Image source={require('../../img/pago_icon.png')} />
         :
         null
        }
      </View>
      <Animated.View style={[styles.contenido, {height:animacion} ]}>
         {
          title === 'Calendario' ? 
            <Animated.View style={{height:animacion}}>
                <CalendarTotals show={show} dataCalendar={dataCalendar} setDateCalendar={setDateCalendar} />
            </Animated.View>
          :
          null
         }
         {
          title === 'Ventas' ? 
            <Animated.View style={{height:animacion}}>
                 {
                  show ?
                  <SectionVentas show={show} lineasNegocio={lineasNegocio} />
                  : null
                 }
            </Animated.View>
          :
          null
         }
         {
          title === 'Por Pagar' ? 
            <Animated.View style={{height:animacion}}>
                 {
                  show ?
                    <SectionPorPagar />
                  : null
                 }
            </Animated.View>
          :
          null
         }
      </Animated.View>
    </Pressable>

  )
}

const styles = StyleSheet.create({
    contenedor:
    {
      backgroundColor:'white',
      borderRadius:10,
      margin:10,
      padding:16,
    },
    titulo:{
        fontSize:25,
        color:'black',
    },
    headerCard:{
       flexDirection:'row',  
       justifyContent:'space-between'  
    },
    contenido:
    {

    }
})

export default DropDownItem
