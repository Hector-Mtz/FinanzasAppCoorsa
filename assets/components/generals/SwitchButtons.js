import React, {useState, useEffect} from 'react'
import { 
    StyleSheet,
    Text,
    View,
    Pressable,
    Animated
 } from 'react-native'
const SwitchButtons = (
    slide,
    setSlide
) => 
{
 
 //console.log(slide)

 const [animacion] =  useState(new Animated.Value(-105))

 useEffect(() => 
 {
    switch (slide.slide) 
    {
        case 0:
            Animated.timing(animacion,{
                toValue:-118,
                duration:100,
                useNativeDriver:false
               }).start()
            break;
    
        case 1:
            Animated.timing(animacion,{
                toValue:-12,
                duration:100,
                useNativeDriver:false
               }).start()
            break;
        
        case 2:
            Animated.timing(animacion,{
                toValue:106,
                duration:100,
                useNativeDriver:false
               }).start()
            break;
    }
    
   //console.log(slide)
 },[slide.slide])

 const estiloAnimacion = {
    transform:[
      {translateX:animacion},
    ]
  }
  return (
    <View style={styles.contendor}>
        <Animated.View style={[styles.slide, estiloAnimacion]}></Animated.View>
        <Pressable onPress={()=> 
        {
            slide.setSlide(0)
        }} style={styles.item_slide}>
            {
                slide.slide == 0 ?
                <Text style={[styles.text,{color:'white', fontWeight:'bold'}]}>Todas</Text>
                :
                <Text style={styles.text}>Todas</Text>
            }
            
        </Pressable>
        <Pressable onPress={() => 
        {
            slide.setSlide(1)
        }} style={styles.item_slide}>
            {
                slide.slide == 1 ?
                 <Text style={[styles.text,{color:'white', fontWeight:'bold'}]}>Abiertas</Text>
                 :
                 <Text style={styles.text}>Abiertas</Text>
            }
            
        </Pressable>
        <Pressable onPress={() => 
        {
            slide.setSlide(2)
        }} style={styles.item_slide}>
            {
                slide.slide == 2 ?
                 <Text style={[styles.text,{color:'white', fontWeight:'bold'}]}>Cerradas</Text>
                :
                <Text style={styles.text}>Cerradas</Text>
            }
            
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create(
    {
        contendor:
        {
            flexDirection:'row',
            justifyContent:'center'
        },
        item_slide:
        {
          marginHorizontal:25
        },
        text:
        {
         textTransform:'uppercase',
         color:'black'
        },
        slide:
        {
           position:'absolute',
           backgroundColor:'#1D96F1',
           width:90,
           height:30,
           zIndex:-2,
           borderRadius:15,
           marginTop:-4 
        }
    }
)

export default SwitchButtons