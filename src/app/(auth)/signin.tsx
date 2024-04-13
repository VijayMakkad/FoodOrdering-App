import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'
import { Link, Stack } from 'expo-router'
import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import { supabase } from '@/src/lib/supabase'
const SignIn = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
      const [loading, setLoading] = useState(false)

      async function signInwihEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) {
          Alert.alert(error.message)
        }
        setLoading(false)
      }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
    <Stack.Screen options={{ title:'Sign In' }} />
      <Text style={styles.label}>Email</Text>
      <TextInput value={email} placeholder="example@gmail.com" onChangeText={setEmail}style={styles.TextBox} />

      <Text style={styles.label}>Password</Text>
      <TextInput value={password} onChangeText={setPassword}  style={styles.TextBox} secureTextEntry />

      <Button onPress={signInwihEmail} disabled={loading} style={{marginTop:10,}}text={loading?'Signing In....':'Sign In'}/>
<Link href='/signup'>
      <Text style={styles.button}>Create Account</Text>
</Link>
    </View>
    </TouchableWithoutFeedback>
  )
}
export default SignIn

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    flex:1,
    padding:10,
  },
label:{
    color:'gray',
    fontSize:16,
    margin:10,
    },
TextBox:{
    backgroundColor:'white',
    padding:10,
    borderRadius:5,
    borderColor:'gray',
    borderWidth:1,
},
button:{
    color:Colors.light.tint,
    fontWeight:'bold',
    fontSize:16,
    textAlign:'center',
    marginVertical:10,
},
})