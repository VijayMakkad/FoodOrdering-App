import {StyleSheet, Text, View, FlatList } from 'react-native';
import ProductListItem from '@/src/components/ProductListItem';
import { ActivityIndicator } from 'react-native';
import { useProductList } from '@/src/api/products';


export default function MenuScreen() {
  const {data:products,error,isLoading} =useProductList()
  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    return <Text>Failed to Fetch Data</Text>
  }
  // useEffect(()=>{
  //   const fetchProducts=async()=>{
  //     const {data,error}=await supabase.from('products').select('*')
  //     console.log(error)
  //     console.log(data)
  //   }
  //   fetchProducts()
  // },[])

  return (
    <View>
      {/* {products.map((product)=>{
        return <ProductListItem key={product.id} {...product}/>
      })} */}
      <Text style={styles.title}>Vijay's FoodMart</Text>
      <FlatList
      data={products}
      renderItem={({item})=> <ProductListItem {...item}/>}
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