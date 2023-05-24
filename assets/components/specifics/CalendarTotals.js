import React, {useEffect, useState} from 'react'
import { Text, View, StyleSheet, Animated } from 'react-native'
import {Calendar, LocaleConfig, Agenda, AgendaEntry, AgendaSchedule, DateData} from 'react-native-calendars';
import testIds from '../../utils/testIds';
import { formatoMoney } from '../../utils/conversiones';
import axios from 'axios';

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

  
  const consultarPorDia = async (fecha) =>  //funcion para consultar por dia
  {
    await axios.get('https://finanzas.coorsamexico.com/api/getDataPorDia',
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
          sumC += c.cantidad     
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
                  setSelected(day.dateString)
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
                      <View style={styles.contenedorIndicador}>
                         <View style={{flexDirection:'row'}}>
                           <Text style={styles.indicator}>V</Text>
                           <View style={[styles.span, colors.ventas]}></View>
                           <View style={{marginLeft:90}}>
                             <Text> $ {formatoMoney(ventaShow)} </Text>
                           </View>
                         </View>
                      </View>
                      <View style={styles.contenedorIndicador}>
                         <View  style={{flexDirection:'row'}}>
                           <Text style={styles.indicator}>PC</Text>
                           <View style={[styles.span, colors.pc]}></View>
                           <View style={{marginLeft:70}}>
                             <Text> $ {formatoMoney(pcShow)} </Text>
                           </View>
                         </View>
                      </View>
                      <View style={styles.contenedorIndicador}>
                         <View style={{flexDirection:'row'}}>
                           <Text style={styles.indicator}>PP</Text>
                           <View style={[styles.span, colors.pp]}></View>
                           <View style={{marginLeft:70}}>
                             <Text> $ {formatoMoney(ppShow)} </Text>
                           </View>
                         </View>
                      </View>
                      <View style={styles.contenedorIndicador}>
                         <View style={{flexDirection:'row'}}>
                           <Text style={styles.indicator}>C</Text>
                           <View style={[styles.span, colors.c]}></View>
                           <View style={{marginLeft:90}}>
                             <Text> $ {formatoMoney(cShow)} </Text>
                           </View>
                         </View>
                      </View>
                      <View style={styles.contenedorIndicador}>
                         <View style={{flexDirection:'row'}}>
                           <Text style={styles.indicator}>D</Text>
                           <View style={[styles.span, colors.n]}></View>
                           <View style={{marginLeft:90}}>
                             <Text> $ {formatoMoney(notashow)} </Text>
                           </View>
                         </View>
                      </View>
                  </View>
                </View>
                : null
              }
            </View>
            :
          null
        }

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