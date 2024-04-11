import { StyleSheet, Image,Pressable } from 'react-native'
import Colors from '@/src/constants/Colors'
import { Text, View } from '@/src/components/Themed'
import { Link } from 'expo-router'
interface ProductListProps {
  id: number
  name: string
  image: string | null
  price: number
}

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const ProductListItem = (props: ProductListProps) => {
  const { id,name, image, price } = props
  return (
    console.log(props),
    (
      <Link href={`/menu/${id}`} asChild>
        <Pressable style={styles.container}>
          <Image
            source={{ uri: image || defaultPizzaImage }}
            style={styles.image}
          />
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.price}>${price}</Text>
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
  },
  price: {
    fontSize: 16,
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
})

export default ProductListItem
