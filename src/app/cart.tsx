import { View, Text,Platform,FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useContext } from 'react'
import  {CartContext}  from '@/src/providers/CartProvider'
import CartListItem from '../components/CartListItems'
import Button from '../components/Button'
const CartScreen = () => {
  const {items,total}=useContext(CartContext)
  return (
    <View style={{padding:10}}>
      <FlatList data={items} renderItem={({item})=><CartListItem cartItem={item}/>}
      contentContainerStyle={{padding:10,gap:10}}
      />
      <Text style={{marginTop:20,fontSize:20,fontWeight:'500', color:'grey'}}>Total: ${total}</Text>
      <Button text="Checkout"/>
      
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}
export default CartScreen

export const useCart=()=>useContext(CartContext) 