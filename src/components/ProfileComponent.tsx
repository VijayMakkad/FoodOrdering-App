import { useProfile } from '@/src/api/profile'
import { View } from './Themed'
import { Text } from 'react-native-elements'
import RemoteImage from './RemoteImage'
import { ActivityIndicator } from 'react-native'

type ProfileComponentProps = {
    id: number
}
const defaultAvatar = 'https://www.gravatar.com/avatar/'



const ProfileComponent = ({ id }:ProfileComponentProps) => {
  const { data, error, isLoading } = useProfile(id)
  const username = data?.username || 'N/A'
  const fullName = data?.full_name || 'N/A'
  if (isLoading) {
    return <ActivityIndicator/>
  }
   if (!data || undefined) {
     return <Text>No Profile Found</Text>
   }
  if (error || undefined) {
    return <Text>Failed to Fetch Profile</Text>
  }
  console.log(data)

  return (
    <View>
      <RemoteImage
        path={data?.avatar_url}
        fallback={defaultAvatar}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          alignSelf: 'center',
          backgroundColor: 'white',
        }}
      />
      <Text
        style={{
          color: 'white',
          marginTop: 30,
          fontWeight: 'bold',
          fontSize: 18,
        }}
      >
        Userame: {username}
      </Text>
      <Text
        style={{
          color: 'white',
          marginTop: 10,
          fontWeight: 'bold',
          fontSize: 18,
        }}
      >
        Full Name: {fullName}
      </Text>
    </View>
  )
}

export default ProfileComponent
