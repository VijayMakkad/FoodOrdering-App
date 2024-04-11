import { Stack, useLocalSearchParams } from 'expo-router'
import { View, Text, StyleSheet, Image , Pressable} from 'react-native'
import products from '@/assets/data/products'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import { useState } from 'react'
import Button from '@/src/components/Button'

const sizes = ['S', 'M', 'L']

const ProdcutDetailsScreen = () => {
    const [selectedSize,setSelectedSize]=useState('S')
  const { id } = useLocalSearchParams()
  const product = products.find((product) => product.id.toString() === id)
  if (!product) {
    return <Text>Product Not Found!</Text>
  }
  const addToCart=()=>{
    console.warn('Add to cart',product,selectedSize)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
        <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => {
          return (
            <Pressable onPress={()=>{setSelectedSize(size)}} style={[styles.size,
            {backgroundColor:selectedSize===size?'gainsboro':'white'}
            ]} key={size}>
              <Text style={[styles.sizeText,
                {color:selectedSize===size?'black':'grey'}
                ]} key={size}>
                {size}
              </Text>
            </Pressable>
          )
        })}
      </View>
      <Text style={styles.price}>Price:${product.price}</Text>
      <Button onPress={addToCart} text='Add To Cart'/>
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
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
  size:{
    backgroundColor:'gainsboro',
    width:50,
    aspectRatio:1,
    padding:10,
    margin:5,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
})