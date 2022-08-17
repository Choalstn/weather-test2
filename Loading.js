import {View,ActivityIndicator,StyleSheet} from 'react-native';


export default function Loading() {
    return(
        <View style={style.day}>
        <ActivityIndicator size="large" color="gray" style={{marginTop:10}}/>
       </View>
    )
}

const style = StyleSheet.create({
    day : {
        alignItems : 'center',
        alignContent : 'center',
       },
})
