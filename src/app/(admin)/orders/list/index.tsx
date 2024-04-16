import { FlatList,Text } from 'react-native'
import OrderListItem from '../../../../components/OrderListItem'
import { Stack } from 'expo-router'
import { useAdminOrderList } from '@/src/api/orders'
import { ActivityIndicator } from 'react-native'

export default function OrdersScreen() {
  const {data:orders,isLoading,error}=useAdminOrderList({archived:false})
  if(isLoading){
    return <ActivityIndicator />
  }
  if(error){
    return <Text>Failed to fetch Data!</Text>
  }


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
