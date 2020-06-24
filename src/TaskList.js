import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function TaskList({data , deleteItem, editarItem}) {
 return (
   <View style={styles.container}>
       <TouchableOpacity style={{marginRight:10}} onPress={()=> deleteItem(data.key)} >
            <Icon name="trash" color="#fff" size={20}  />
       </TouchableOpacity>

        
       <View style={{paddingRight:15}}>
        <TouchableNativeFeedback onPress={()=> editarItem(data)}>
           <Text style={{color:'#fff', paddingRight:10}}> {data.nome} </Text>
        </TouchableNativeFeedback>
       </View>
   </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#121212',
        marginBottom:10,
        padding:10,
        borderRadius:5
    },

})