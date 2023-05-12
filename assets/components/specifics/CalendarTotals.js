import React, {useState} from 'react'
import { Text, View, StyleSheet, Animated } from 'react-native'
import {Calendar, LocaleConfig, Agenda, AgendaEntry, AgendaSchedule, DateData} from 'react-native-calendars';
import testIds from '../../utils/testIds';

const CalendarTotals = (
    {
        show
    }
) => {
  
  const [selected, setSelected] = useState('');
  const [fechas, setFechas] = useState({
    '2023-05-22': {
      marked:true,
      dotColor:'red'
    }
  })
  return (
    <View>
        {
            show ? 
            <View>
               <Calendar
                 markedDates={fechas}
                 onDayPress={day => {
                  //console.log('selected day', day);
                  setSelected(day)
                }}
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
                      <View>
                         <Text style={styles.indicator}>V</Text>
                      </View>
                      <View>
                         <Text>PC</Text>
                      </View>
                      <View>
                         <Text>PP</Text>
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
      indicator:{
        fontSize:13
        
      }
    }
)
export default CalendarTotals