import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import OrderItemListItem from '../../../components/OrderItemListItem'
import OrderListItem from '../../../components/OrderListItem'
import { useOrderDetails } from '@/src/api/orders'

const OrderDetailScreen = () => {

  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const {data:order,isLoading,error}=useOrderDetails(id)

  // const order = orders.find((o) => o.id.toString() === id)
  if (error || !order) {
    return <Text>Failed to Fetch Order</Text>
  }
  if (isLoading) {
    return <ActivityIndicator/>
  }


  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.orders_item}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
})

export default OrderDetailScreen
