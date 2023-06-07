import React, {useEffect, useState} from 'react'
import { Text, View, StyleSheet, Animated, Pressable } from 'react-native'
import {Calendar, LocaleConfig, Agenda, AgendaEntry, AgendaSchedule, DateData} from 'react-native-calendars';
import testIds from '../../utils/testIds';
import { formatoMoney } from '../../utils/conversiones';
import axios from 'axios';
import ModalTypeMoveAll from './Partials/ModalTypeMoveAll';

const CalendarTotals = (
    {
        show,
        dataCalendar,
        setDateCalendar
    }
) => {
  
  const [selected, setSelected] = useState('');
  const [colors] = useState({
    ventas: {backgroundColor: '#44BFFC'},
    pc: {backgroundColor: '#697FEA'},
    pp: {backgroundColor: '#B66BF5'},
    c: {backgroundColor: '#56D0C1'},
    n:{backgroundColor:'#56B098'},
    //colors Marked
    ventasC: '#44BFFC',
    pcC: '#697FEA',
    ppp: '#B66BF5',
    cC: '#56D0C1'
  })

  const [ventaShow, setVentaShow] = useState(0)
  const [pcShow, setPcShow] = useState(0)
  const [ppShow, setPpShow] = useState(0)
  const [cShow, setCShow] = useState(0)
  const [notashow, setNotasShow] = useState(0)

  //si cambia el dia
  useEffect(() => 
  {
     consultarPorDia(selected)
  },[selected])

  //Variable del dia
  const [dia, setDia] = useState('');
  const consultarPorDia = async (fecha) =>  //funcion para consultar por dia
  {
    setDia(fecha)
    await axios.get('https://coorsamexico-finanzas-4mklxuo4da-uc.a.run.app/api/getDataPorDia',
    {
      params:
      {
        fecha:fecha
      }
    }).then(response => 
      {
        //console.log(response.data)
        let sumVentas = 0;
        let sumPc = 0;
        let sumPp = 0;
        let sumC = 0;
        let sumNotas =0;

        for (let index = 0; index < response.data.ventas.length; index++) 
        {
          const venta = response.data.ventas[index];
          sumVentas += venta.total;
        }

        for (let index2 = 0; index2 < response.data.pc.length; index2++) 
        {
          const pc = response.data.pc[index2];
          //console.log(pc);
          sumPc += pc.total; 
        }

        for (let index3 = 0; index3 < response.data.pp.length; index3++) 
        {
          const pp = response.data.pp[index3];
          //console.log(pc);
          sumPp += pp.total; 
        }

        for (let index4 = 0; index4 < response.data.c.length; index4++)
         {
          const c = response.data.c[index4];
          //console.log(c)
          sumC += c.total     
        }

        for (let index5 = 0; index5 < response.data.notas.length; index5++)
         {
          const nota = response.data.notas[index5];
          sumNotas += nota.cantidad     
        }

        setVentaShow(sumVentas.toFixed(2))
        setPcShow(sumPc.toFixed(2))
        setPpShow(sumPp.toFixed(2))
        setCShow(sumC.toFixed(2))
        setNotasShow(sumNotas.toFixed(2))
      })  
  }
  
  const [change, setChange] = useState(true)

  //Variable para modal
  const [modalItem, setModalItem] = useState(false)
  const [title, setTitle] = useState('');
   
  return (
    <View>
        {
            show ? 
            <View>
               <Calendar
                 markedDates={dataCalendar}
                 onDayPress={day => 
                {
                  //console.log('selected day', day);
                  let fechaAnterior = {};
                  setSelected(day.dateString)
                  fechaAnterior = dataCalendar[day.dateString]
                  // console.log(change)
                  if(fechaAnterior == undefined) //sino encuentra el dia dentro del array no hace nada
                  {
                    return null;
                  }
                  else
                  {
                    if(fechaAnterior.selected)
                    {
                      fechaAnterior.selected =true
                      if(dia !== '')
                      {
                          let fechAnteriorOld = dataCalendar[dia];
                          //console.log(fechAnteriorOld)
                          fechAnteriorOld.selected = false
                      }
                    }
                  }
                                    
                  //console.log(day.dateString)
                }}
               onMonthChange={month => 
                {
                   setDateCalendar(month.dateString.substring(0,7))
                }
               }
               markingType='multi-dot'
           
            />
              {
                selected !== '' ?
                <View >
                 <View style={styles.contenedorFecha}>
                  <Text style={styles.fechaSeleccionada}>
                    {selected.dateString}
                   </Text>
                 </View>
                  <View>
                      <Pressable onPress={() => 
                       {
                        setModalItem(true)
                        setTitle('Ventas')
                        //console.log(ventaShow)
                       }} style={styles.contenedorIndicador}>
                         <View style={{flexDirection:'row'}}>
                           <Text style={styles.indicator}>V</Text>
                           <View style={[styles.span, colors.ventas]}></View>
                           <View style={{marginLeft:90}}>
                             <Text style={{color:'#C6C6C6'}}> $ {formatoMoney(ventaShow)} </Text>
                           </View>
                         </View>
                      </Pressable>
                      <Pressable  onPress={() => 
                       {
                        setModalItem(true)
                        setTitle('Por cobrar')
                        //console.log(ventaShow)
                       }}  style={styles.contenedorIndicador}>
                         <View  style={{flexDirection:'row'}}>
                           <Text style={styles.indicator}>PC</Text>
                           <View style={[styles.span, colors.pc]}></View>
                           <View style={{marginLeft:70}}>
                              <Text style={{color:'#C6C6C6'}}> $ {formatoMoney(pcShow)} </Text>
                           </View>
                         </View>
                      </Pressable>
                      <Pressable  onPress={() => 
                       {
                        setModalItem(true)
                        setTitle('Por pagar')
                        //console.log(ventaShow)
                       }}  style={styles.contenedorIndicador}>
                         <View style={{flexDirection:'row'}}>
                           <Text style={styles.indicator}>PP</Text>
                           <View style={[styles.span, colors.pp]}></View>
                           <View style={{marginLeft:70}}>
                             <Text style={{color:'#C6C6C6'}}> $ {formatoMoney(ppShow)} </Text>
                           </View>
                         </View>
                      </Pressable>
                      <Pressable  onPress={() => 
                       {
                        setModalItem(true)
                        setTitle('Cobrado')
                        //console.log(ventaShow)
                       }}  style={styles.contenedorIndicador}>
                         <View style={{flexDirection:'row'}}>
                           <Text style={styles.indicator}>C</Text>
                           <View style={[styles.span, colors.c]}></View>
                           <View style={{marginLeft:90}}>
                             <Text style={{color:'#C6C6C6'}}> $ {formatoMoney(cShow)} </Text>
                           </View>
                         </View>
                      </Pressable>
                      <Pressable  onPress={() => 
                       {
                        setModalItem(true)
                        setTitle('Descuento')
                        //console.log(ventaShow)
                       }}  style={styles.contenedorIndicador}>
                         <View style={{flexDirection:'row'}}>
                           <Text style={styles.indicator}>D</Text>
                           <View style={[styles.span, colors.n]}></View>
                           <View style={{marginLeft:90}}>
                             <Text style={{color:'#C6C6C6'}}> $ {formatoMoney(notashow)} </Text>
                           </View>
                         </View>
                      </Pressable>
                  </View>
                </View>
                : null
              }
            </View>
            :
          null
        }
     <ModalTypeMoveAll modalItem={modalItem} setModalItem={setModalItem} title={title} dia={dia} />
   </View>
  )
}

const styles = StyleSheet.create(
    {
      contenedorFecha:
      {
        alignItems:'center'
      },
      fechaSeleccionada:
      {
        fontSize: 20
      },
      contenedorIndicador:{
        margin:5,
        borderBottomWidth:1,
        marginVertical:8,
        borderColor:'#F2F2F2'
      },
      indicator:{
        fontSize:30,
        color:'#C6C6C6'
      },
      span:{
        width:5,
        height:35,
        position:'absolute',
        marginLeft:80,
        borderRadius:5
      }
    }
)
export default CalendarTotals