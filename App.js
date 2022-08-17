import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from "./Loading";
import Weather from "./Weather";

import {View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';

const {width : SCREEN_WIDTH} = Dimensions.get('window');

const API_KEY  = '00f28591d749f7f01ce6ce18cb876c1f';

const icons = {
  Clouds : {
    icon : "cloudy",
    gradient : ["#373B44", "#4286f4"]
  },
  "Clear" : "day-sunny",
  "Rain" : "rains",
  "Snow" : "snow",
  "Drizzle" : "rain",
  "Thunderstorm" : "lightnings",
  "Atmosphere" : "cloudy-gusts",
}

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if(!granted) {
      setOk(false);
    }

    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5 });
    const location = await  Location.reverseGeocodeAsync({latitude, longitude }, {useGoogleMaps:false});
    setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays (json.daily);
  }

  useEffect(() => {
    getWeather();
  }, [])

  return (
      <ScrollView 
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator = 'false'
      >
        {days.length == 0 
        ?(
          <Loading />
        )
        :(
          days.map((day) => 
          <Weather 
          key={day.temp.day}
          temp ={parseFloat(day.temp.day).toFixed(1)}
          condition={day.weather[0].main}
          tinyDesc={day.weather[0].description}
          city = {city}
          date ={new Date(day.dt * 1000).toString().substring(0, 10)}/>
         )
        )}
      </ScrollView>
  );
}

const style = StyleSheet.create({
   container : {
    flex:1, 
    //backgroundColor: '#AFEEEE'
   },

   city : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
   },

   cityName : {
    marginTop: 20,
    fontSize: 68,
    fontWeight: '700',
   },

   weather : {
   },

   day : {
    width:SCREEN_WIDTH,
    alignItems : 'flex-start',
    paddingHorizontal : 20 
   },

   date : {
    fontSize : 25,
   },

   temp : {
    marginTop: 0,
    fontSize: 80,
    fontWeight: '600'
   },

   desc : {
    marginTop: -10,

    fontSize : 30,
   },

   tinyDesc : {
    marginTop: -2,
    fontSize : 20,
   }
})