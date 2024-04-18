import React from 'react'
import { View, Text, } from 'react-native'
import Button from '@/src/components/Button'
import { supabase } from '@/src/lib/supabase'
import { useLocalSearchParams } from 'expo-router'
import ProfileComponent from '@/src/components/ProfileComponent'


const ProfileScreen = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <Text
        style={{
          color: 'white',
          margin: 50,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 36,
        }}
      >
        Ola Amigo!
      </Text>
      <ProfileComponent id={id}/>
      <Button
        text="Update Profile"
        onPress={() => console.warn('PLEASE HELP')}
      />
      <Button
        text="Sign Out"
        onPress={async () => {
          await supabase.auth.signOut()
        }}
      />
    </View>
  )
}

export default ProfileScreen
