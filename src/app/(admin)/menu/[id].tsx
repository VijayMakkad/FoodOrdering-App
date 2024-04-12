import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, StyleSheet, Image , Pressable} from 'react-native'
import products from '@/assets/data/products'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import { useState } from 'react'
import Button from '@/src/components/Button'
import { PizzaSize } from '@/src/types'
import { useCart } from '../../cart'
import Colors from '@/src/constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
const sizes:PizzaSize[] = ['S', 'M', 'L']

const ProdcutDetailsScreen = () => {

  const router=useRouter()
  const [selectedSize,setSelectedSize]=useState<PizzaSize>('S')
  const { id } = useLocalSearchParams()
  const { addItem }=useCart()
  const product = products.find((product) => product.id.toString() === id)

  const addToCart=()=>{
    if(!product){return}
    addItem(product,selectedSize)
    router.push('/cart')
  }

  if (!product) {
    return <Text>Product Not Found!</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.price}>{product.name}</Text>

      <Text style={styles.price}>Price:${product.price}</Text>
    </View>
  )
}

export default ProdcutDetailsScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
 
})
