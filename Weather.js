import { Fontisto } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {View, Text, StyleSheet, Dimensions , ScrollView } from 'react-native';

const {width : SCREEN_WIDTH} = Dimensions.get('window');

const weatherOptions = {
    Clouds : {
        icon : "cloudy",
        gradient : ["#2c3e50", "#bdc3c7"]
    },

    Snow : {
        icon : "snow",
        gradient : ["#bdc3c7", "#2c3e50"]
    },

    Clear : {
        icon : "day-sunny",
        gradient : ["#2F80ED", "#56CCF2"]
    },

    Rain : {
        icon : "rains",
        gradient : ["#373B44", "#4286f4"]
    },

    Drizzle : {
        icon : "rain",
        gradient : ["#bdc3c7", "#2c3e50"]
    },

    Thunderstorm : {
        icon : "lightnings",
        gradient : ["#bdc3c7", "#2c3e50"]
    },
    

    Atmosphere : {
        icon : "cloudy-gusts",
        gradient : ["#bdc3c7", "#2c3e50"]
    },
}


function Weather({temp, condition, tinyDesc, city, date}) {
    return(
        <LinearGradient colors={weatherOptions[condition].gradient} style={style.container}>
        <View style={style.city}>
        <Text style={style.cityName}>{city}</Text> 
        <Text style={style.date}>{date}</Text>
      </View>

          <View style={style.day}>
            <View 
            style={{
              flexDirection:"row",
              alignItems:'center',
              width:"100%",
              justifyContent : "space-between",
              marginTop:-470,
              }}>
                
            <Text style={style.temp}>{temp}°</Text>
            <Fontisto name={weatherOptions[condition].icon} size={48} color="white" style={{marginRight:25, marginTop:-40}}/>
            </View>
            <Text style={style.desc}>{condition}</Text>
            <Text style={style.tinyDesc}>{tinyDesc}</Text>
          </View>
          </LinearGradient>
    )
}

const style = StyleSheet.create({
    container : {
     flex:1, 
    },
 
    city : {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     marginTop : -450,
    },
 
    cityName : {
     marginTop: 20,
     fontSize: 68,
     fontWeight: '700',
     color: 'white'
    },
 
    day : {
     width:SCREEN_WIDTH,
     alignItems : 'flex-start',
     paddingHorizontal : 30,
    },
 
    date : {
     fontSize : 25,
     color:'white',
     marginTop : 10
    },
 
    temp : {
     marginTop: 0,
     fontSize: 80,
     fontWeight: '600',
     color:'white'
    },
 
    desc : {
     fontSize : 30,
     marginTop: -10,
     paddingBottom: 100,
     color:'white'
    },
 
    tinyDesc : {
     marginTop: -65,
     fontSize : 20,
     color:'white'
    }
 })

export default Weather;