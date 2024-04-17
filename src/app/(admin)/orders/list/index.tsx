import { FlatList,Text } from 'react-native'
import OrderListItem from '../../../../components/OrderListItem'
import { Stack } from 'expo-router'
import { useAdminOrderList } from '@/src/api/orders'
import { ActivityIndicator } from 'react-native'
import { useEffect } from 'react'
import { supabase } from '@/src/lib/supabase'
import { useQueryClient } from '@tanstack/react-query'

export default function OrdersScreen() {
  const {data:orders,isLoading,error}=useAdminOrderList({archived:false})
  if(isLoading){
    return <ActivityIndicator />
  }
  if(error){
    return <Text>Failed to fetch Data!</Text>
  }


  const queryClient =useQueryClient()
  
  useEffect(()=>{
    
const orders = supabase
  .channel('custom-insert-channel')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'orders' },
    (payload) => {
      console.log('Change received!', payload)
      queryClient.invalidateQueries(['orders'])

    }
  )
  .subscribe()
  },[])

  return (
    <>
      <Stack.Screen options={{ title: 'ACTIVE' }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  )
}
