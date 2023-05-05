import React, {useState,useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

const CalendarButton = (
    {
        year,
        month,
        setDate
    }
) => {

  

  return (
   <Text>
      {year}
   </Text>
  )
}

export default CalendarButton