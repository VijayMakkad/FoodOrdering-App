import { Stack } from 'expo-router'

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen name="list" options={{ headerShown:false }} />
    </Stack>
  )
}
