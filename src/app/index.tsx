import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { Link, Redirect } from 'expo-router'
import { useAuth } from '../providers/AuthProvider'
import { supabase } from '../lib/supabase'

const index = () => {

  const {session,loading}=useAuth()
  if(loading){
    return <ActivityIndicator/>
  }
  if(!session){
    return <Redirect href={'/signin'}/>
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={'/signin'} asChild>
        <Button text="Sign In" />
      </Link>
      <Button onPress={()=>supabase.auth.signOut()} text='Sign Out'/>
    </View>
  )
}

export default index
