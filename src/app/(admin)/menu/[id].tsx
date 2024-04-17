import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, StyleSheet, Image , Pressable, ActivityIndicator} from 'react-native'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import { useState } from 'react'
import Button from '@/src/components/Button'
import { PizzaSize } from '@/src/types'
import { useCart } from '@/src/providers/CartProvider'
import Colors from '@/src/constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { useProduct } from '@/src/api/products'
const sizes:PizzaSize[] = ['S', 'M', 'L']

const ProdcutDetailsScreen = () => {

  const router=useRouter()
  const [selectedSize,setSelectedSize]=useState<PizzaSize>('S')

  const { id:idString } = useLocalSearchParams()
  const id=parseFloat(typeof idString==='string'?idString:idString[0])
  const {data:product,error,isLoading}=useProduct(id);
  if(error){
    return <Text>Failed to fetch Product</Text>
  }
  if(isLoading){
    return <ActivityIndicator/>
  }

  const { addItem }=useCart()
  
  const addToCart=()=>{
    if(!product){return}
    addItem(product,selectedSize)
    router.push('/cart')
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
