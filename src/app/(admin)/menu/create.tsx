import { View, Text , StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Image,Alert} from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/Button'
import { parse } from '@babel/core'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams } from 'expo-router'

const createProductScreen = () => {
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [error,setError]=useState('')
    const [image,setImage]=useState<string|null>(null)

    const {id}=useLocalSearchParams()
    const isUpdating=!!id

    const resetFeilds=()=>{
        setName('')
        setPrice('')
    }
    
    const validateInput=()=>{
        setError('')
        if(!name){
            setError('Please enter a name')
            return false
        }
        if(!price){
            setError('Please enter a price')
            return false
        }
        if(isNaN(parseFloat(price))){
            setError('Price is Not a number')
            return false
        }
        return true
    }

    const onCreate = () => {
        if(!validateInput()){
            return;
        }
      console.warn('Creating Product', name, price)

      resetFeilds()
    }

     const onUpdate = () => {
       if (!validateInput()) {
         return
       }
       console.warn('Updating Product', name, price)

       resetFeilds()
     }

    const onSubmit=()=>{
        if(isUpdating){
            onUpdate()
        }else{
            onCreate()
        }
    }

     const pickImage = async () => {
       // No permissions request is necessary for launching the image library
       let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
       })

       console.log(result)

       if (!result.canceled) {
         setImage(result.assets[0].uri)
       }
     }

     const onDelete=()=>{
            console.warn('DELETE')
     }

     const confirmDelete = () => {
        Alert.alert("Confirm Delete", "Are you sure you want to delete this product?",[{
            text:'Cancel',
        },{
            text:'Delete',
            style:'destructive',
            onPress:onDelete
        
        }])
     }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}  
                                accessible={false}>

    <View style={styles.container}>

        <Stack.Screen options={{title: isUpdating? "Update Product" :'Create Product'}}/>

        <Image source={{uri: image || defaultPizzaImage}} style={styles.image}/>

        <Text onPress={pickImage} style={styles.selectText}>Select Image</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input}  />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput placeholder="9.99" style={styles.input} 
      keyboardType='numeric' value={price} onChangeText={setPrice} />

        <Text style={{color:'red'}}>{error}</Text>
      <Button onPress={onSubmit} text={isUpdating?'Update':'Create'}/>
      {isUpdating && <Text onPress={confirmDelete} style={styles.selectText}>Delete</Text>}
    </View>
      </TouchableWithoutFeedback>
  )
}
export default createProductScreen

const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
    padding:10,
},
input:{
    backgroundColor:'white',
    padding:10,
    borderRadius:5,
    borderColor:'gray',
    borderWidth:1,
    marginTop:5,
    marginBottom:5,
},
label:{
    color:'gray',
    fontSize:16,
},
image:{
    width:'50%',
    aspectRatio:1,
    alignSelf:'center',
},
selectText:{
    fontSize:16,
    fontWeight:'bold',
    color:Colors.light.tint,
    alignSelf:'center',
    marginVertical:10,
},
})