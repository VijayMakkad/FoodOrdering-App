import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import OrderItemListItem from '../../../components/OrderItemListItem'
import OrderListItem from '../../../components/OrderListItem'
import Colors from '@/src/constants/Colors'
import { OrderStatusList } from '@/src/types'
import { ActivityIndicator } from 'react-native'
import { useOrderDetails, useUpdateOrder } from '@/src/api/orders'

const OrderDetailScreen = () => {
  
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: order, isLoading, error } = useOrderDetails(id)

  const updateStatus=(status:string)=>{
    updateOrder({id:id,updatedField:{status}})
  }
  const {mutate:updateOrder}=useUpdateOrder()
  // const order = orders.find((o) => o.id.toString() === id)
  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error || !order) {
    return <Text>Failed to Fetch Order</Text>
  }
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.orders_item}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: 'bold' }}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? 'white' : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
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
