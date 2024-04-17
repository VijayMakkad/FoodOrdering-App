import { StyleSheet,Pressable } from 'react-native'
import Colors from '@/src/constants/Colors'
import { Text, View } from '@/src/components/Themed'
import { Link, useSegments } from 'expo-router'
import { Tables } from '../types'
import RemoteImage from './RemoteImage'
type ProductListProps ={
 product:Tables<'products'>
}

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const ProductListItem = ({product}: ProductListProps) => {
  const segments=useSegments()
  if (!segments[0]) {
    return null // Or some fallback UI
  }

  return (
    // console.log(props),
    (
      <Link href={`/${segments[0]}/menu/${product.id }`} asChild>
        <Pressable style={styles.container}>
          <RemoteImage
            path={product.image}
            fallback={defaultPizzaImage}
            style={styles.image}
          />
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </Pressable>
      </Link>
    )
  )
} 
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
    borderRadius: 20,
    borderColor: 'lightgrey',
    borderWidth: 1,
    shadowColor: 'black',
    maxWidth: '50%',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
    color:'black',
  },
  price: {
    fontSize: 16,
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
})

export default ProductListItem
