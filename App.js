import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useLayoutEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View,TextInput,TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task'

import { AsyncStorage } from "react-native";

export default function App() {
  const [task,setTask] = useState();
  
  const [taskItems, setTaskItems] =useState([]);



  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems,task]);
    setTask(null);


  }



  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy)
  }

  const save = async() => {
    try{
      await AsyncStorage.setItem("MyItems",JSON.stringify(taskItems));
      console.log(JSON.stringify(taskItems))
    
    }catch(err) {
      alert(err)
    }
  };

  const load = async() => {
    try {
      let jsonValue = await AsyncStorage.getItem("MyItems");
      console.log(jsonValue)

      if (jsonValue  != null) {
        setTaskItems(JSON.parse(jsonValue))
      }


    }catch(err) {
      alert(err)
    }
  };

  const remove = async() => {
    try {
      await AsyncStorage.removeItem("MyItems")
    }
    catch(err) {
      alert(err)
    } finally {
      setTaskItems([])
    }
  }

  useLayoutEffect(() =>{
    load();
  },[]);

  return (
    <View style={styles.container}>

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        


        <View style={styles.items}>
        {

          taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task  text={item}/>
              </TouchableOpacity>
            ) 
            

          })

        }
        </View>
      
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS=== "ios" ? "padding":"height"}
        style={styles.writeTaskWrapper}
        >
          {/* <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text =>setTask(text)}/> */}
          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text =>setTask(text)}/>
          {/* <TouchableOpacity onPress={() => handleAddTask()}> */}
          <TouchableOpacity  
          onPress ={
            () => { handleAddTask(); save(); }
            }

            
          >
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity  
          onPress ={
            () => {save();}
            }>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>💾</Text>
            </View>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },   
  tasksWrapper : {
    paddingTop:80,
    paddingHorizontal:20,
  },
  sectionTitle: {
    fontSize:24,
    fontWeight:'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor:'#FFF',
    borderRadius:60,
    borderColor:'#C0C0C0',
    borderWidth:1,
    width:250,

  },
  addWrapper:{
    width: 60,
    height:60,
    backgroundColor: '#FFF',
    borderRadius:60,
    justifyContent:'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  addText:{},

});