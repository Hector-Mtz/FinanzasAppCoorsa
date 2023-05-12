import React, {useState,useEffect} from 'react'
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'

const CalendarButton = (
    {
      type,
      year,
      setYear,
      month,
      setMonth
    }
) => {

  const sumarUnAñoMas = () => 
  {
    setYear(year+1)  
    //console.log(year)
  }

  const restarUnAñoMenos = () => 
  {
    setYear(year-1)
  }

  const restarUnMesMenos = () =>
  {
    //console.log(month)
    if(month >= 2 && month <= 12)
    {
       setMonth(month-1)
    }
  }

  const sumarUnMesMas = () => 
  {
    //console.log(month)
     if(month >= 1 && month <= 11)
     {
       setMonth(month+1)
     }
  }


  return (
    <View>
      {
        type === 'anual' ?
           <View style={styles.containerButton}>   
              <Pressable style={{marginRight:5}} onPress={() => {
                 restarUnAñoMenos()
                 }}>
                <Image style={{width:12, height:20}} source={require('../../img/arrow_left.png')} />
              </Pressable>
               <Text style={{marginTop:-2, color:'black', fontSize:16, fontWeight:'bold', color:'#9B9B9B', marginHorizontal:15}}>
                {year}
               </Text>
               <Pressable style={{marginLeft:5}} onPress={() => {
                 sumarUnAñoMas()
                }}>
                <Image style={{width:12, height:20}} source={require('../../img/arrow_rigth.png')} />
              </Pressable>
           </View>
          :
          <View style={styles.containerButton}>   
          <Pressable style={{marginRight:5}} onPress={() => {
             restarUnMesMenos()
             }}>
            <Image style={{width:12, height:20}} source={require('../../img/arrow_left.png')} />
          </Pressable>
           <Text style={{marginTop:-2, color:'black', fontSize:16, fontWeight:'bold', color:'#9B9B9B', marginHorizontal:15}}>
             {
               month === 1 ?
               <Text>Enero</Text>
               :
               null
             }
             {
               month ===  2 ?
               <Text>Febrero</Text>
               :
               null
             }
             {
               month === 3 ?
               <Text>Marzo</Text>
               :
               null
             }
             {
               month === 4 ?
               <Text>Abril</Text>
               :
               null
             }
             {
               month === 5 ?
               <Text>Mayo</Text>
               :
               null
             }
             {
               month === 6 ?
               <Text>Junio</Text>
               :
               null
             }
              {
               month === 7 ?
               <Text>Julio</Text>
               :
               null
             }
             {
               month === 8 ?
               <Text>Agosto</Text>
               :
               null
             }
             {
               month === 9 ?
               <Text>Octubre</Text>
               :
               null
             }
             {
               month === 10 ?
               <Text>Septiembre</Text>
               :
               null
             }
             {
               month === 11 ?
               <Text>Noviembre</Text>
               :
               null
             }
             {
               month === 12 ?
               <Text>Diciembre</Text>
               :
               null
             }
           </Text>
           <Pressable style={{marginLeft:5}} onPress={() => {
             sumarUnMesMas()
            }}>
            <Image style={{width:12, height:20}}  source={require('../../img/arrow_rigth.png')} />
          </Pressable>
       </View>
      }
    </View>

  )
}

const styles = StyleSheet.create({
  containerButton:{
    flexDirection:'row',
  }
})

export default CalendarButton

