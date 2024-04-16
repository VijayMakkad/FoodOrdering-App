import products from '@/assets/data/products';
import {StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import ProductListItem from '@/src/components/ProductListItem';
import { useProductList } from '@/src/api/products';
// const product=products[0]


export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList()
  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to Fetch Data</Text>
  }
  return (
    <View>
      {/* {products.map((product)=>{
        return <ProductListItem key={product.id} {...product}/>
      })} */}
      <Text style={styles.title}>Vijay's FoodMart</Text>
      <FlatList
      data={products}
      renderItem={({item})=> <ProductListItem product={item}/>}
      numColumns={2}
      contentContainerStyle={{gap:10,padding:10}}
      columnWrapperStyle={{gap:10}}
      />
      </View>
  );
}

 const styles=StyleSheet.create({
  title:{
    fontSize:24,
    textAlign:'center',
    fontWeight:'bold',
    marginTop:5,
    backgroundColor:'white',
    width:'100%',
    height:50,
    paddingTop:10,
  }
 })