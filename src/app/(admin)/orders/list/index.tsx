import { Text, FlatList, ActivityIndicator } from 'react-native'
import OrderListItem from '@/src/components/OrderListItem'
import { useAdminOrderList } from '@/src/api/orders'
import { useInsertOrderSubscription } from '@/src/api/orders/subscription'

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false })

  useInsertOrderSubscription()

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch</Text>
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  )
}
