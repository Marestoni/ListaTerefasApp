import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import firebase from './src/firebaseConnection';
import TaskList from './src/TaskList';

console.disableYellowBox=true;

export default function App() {

  const inputRef= useRef(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState('');


  useEffect(()=>{
      async function loadTasks(){
        await firebase.database().ref('tarefas').on('value', (snapshot)=>{
            setTasks([]);

            snapshot.forEach((childItem)=>{
              let data = {
                key: childItem.key,
                nome: childItem.val().nome
              };
              setTasks(oldArray =>[...oldArray, data]);
            })
        });
      }
      loadTasks();
  },[]);

  async function handleAdd(){
    if(newTask !== ''){

      if(key !== ''){
        await firebase.database().ref('tarefas').child(key).update({
          nome: newTask,
        });
        Keyboard.dismiss();
        setNewTask('');
        setKey('');
        return;
      }

      let tarefas = await firebase.database().ref('tarefas');
      let chave = tarefas.push().key;

      tarefas.child(chave).set({
        nome:newTask
      });
      Keyboard.dismiss();
      setNewTask('');
    }
  }

 async function handleDelete(key){
  await firebase.database().ref('tarefas').child(key).remove();
  }

function handleEdit(data){
  setNewTask(data.nome);
  setKey(data.key);
  
  inputRef.current.focus();
}

 return (
   <View style={styles.container}>
     <View style={styles.containerTask}>
       <TextInput 
        style={styles.input}
        placeholder="Tarefas para hoje"
        underlineColorAndroid="transparent"
        onChangeText={(texto)=> setNewTask(texto) }
        value={newTask}
        ref={inputRef}
       />
      <TouchableOpacity style={styles.buttonAdd}>
        <Text style={styles.buttonText} onPress={handleAdd}>+</Text>
      </TouchableOpacity>
     </View>

      <FlatList 
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <TaskList data={item}  deleteItem={handleDelete} editarItem={handleEdit} />
        )}
      />

   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:25,
    marginLeft:10,
    marginRight:10
  },
  containerTask:{
    flexDirection:'row',    
  },
  input:{
    flex: 1,
    marginBottom: 10,
    padding:10 ,
    borderWidth: 1,
    borderColor: '#121212',
    height: 40,
    fontSize:17
  },
  buttonAdd:{
    justifyContent:"center",
    alignItems:"center",
    height:40,
    backgroundColor:'#121212',
    paddingLeft:14,
    paddingRight:14,
    marginLeft:5,
  },
  buttonText:{
    color:'#fff',
    fontSize:23,
  }
  
})