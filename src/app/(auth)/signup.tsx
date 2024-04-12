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
} from 'react-native'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Sign Up' }} />
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          placeholder="example@gmail.com"
          onChangeText={setEmail}
          style={styles.TextBox}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.TextBox}
          secureTextEntry
        />

        <Button style={{ marginTop: 10 }} text="Create Account" />
    <Link href='/signin'>
        <Text style={styles.button}>Sign In</Text>
    </Link>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default SignIn

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
  },
  label: {
    color: 'gray',
    fontSize: 16,
    margin: 10,
  },
  TextBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
})
