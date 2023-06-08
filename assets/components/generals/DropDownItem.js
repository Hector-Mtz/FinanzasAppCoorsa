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
import SectionDepositos from '../specifics/SectionDepositos';

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
    //console.log(icon)
    //console.log(show)
     if(show) //mostramos
     {
      switch (icon) 
      {
        case 'calendar':
            Animated.timing(
             animacion,{
                toValue:660,
                duration:100,
                useNativeDriver:false
              }
            ).start()
          break;
        case 'monedas':
          Animated.timing(
            animacion,{
               toValue:970,
               duration:100,
               useNativeDriver:false
             }
           ).start()
          break
        case 'pago' :
          Animated.timing(
            animacion,{
               toValue:650,
               duration:100,
               useNativeDriver:false
             }
           ).start()
          break;
        case 'deposito':
          Animated.timing(
            animacion,{
               toValue:580,
               duration:100,
               useNativeDriver:false
             }
           ).start()
          break
      
      }
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
    <Pressable style={styles.contenedor} onLongPress={() => {setShow(!show)}}>
      <View style={styles.headerCard}>
         <Text style={styles.titulo}>
            {title} 
         </Text>
        {icon === 'calendar' ? 
         <Image style={{width:40, height:40}} source={require('../../img/calendario_icon.png')} />
         :
         null
        }
        {icon === 'deposito' ? 
         <Image style={{width:50, height:50}}  source={require('../../img/icon_deposito.png')} />
         :
         null
        }
        {icon === 'monedas' ? 
         <Image style={{width:50, height:40}} source={require('../../img/monedas_icon.png')} />
         :
         null
        }
        {icon === 'pago' ? 
         <Image style={{width:55, height:50}} source={require('../../img/pago_icon.png')} />
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
         {
          title === 'Depositos' ? 
            <Animated.View style={{height:animacion}}>
                 {
                  show ?
                    <SectionDepositos />
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
        fontFamily:'Montserrat-Medium'
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
